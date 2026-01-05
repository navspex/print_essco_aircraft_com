/**
 * ESSCO Print Calculator - Shopify Draft Order API
 * Cloudflare Pages Function
 * 
 * Creates Shopify Draft Orders with:
 * - Custom line items (print specifications)
 * - Calculated shipping weight (for carrier-calculated rates)
 * - Customer email and shipping address
 * 
 * Updated: January 4, 2026
 * - Added weight field for carrier-calculated shipping
 * - Added requiresShipping flag
 * 
 * API Version: 2025-10 (latest stable)
 */

const SHOPIFY_API_VERSION = '2025-10';

/**
 * Cloudflare Pages Function handler
 */
export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    // Parse request body
    const orderData = await request.json();

    // Validate required fields
    const validation = validateOrderData(orderData);
    if (!validation.valid) {
      return jsonResponse({ error: validation.error }, 400);
    }

    // Create draft order in Shopify
    const result = await createShopifyDraftOrder(orderData, env);

    if (result.error) {
      return jsonResponse({ error: result.error }, 500);
    }

    // Success response
    return jsonResponse({
      success: true,
      draftOrderId: result.id,
      checkoutUrl: result.invoiceUrl,
      orderName: result.name,
      totalWeight: result.totalWeight,
    });

  } catch (error) {
    console.error('Draft order creation failed:', error);
    return jsonResponse({ error: error.message || 'Internal server error' }, 500);
  }
}

/**
 * Validate incoming order data
 */
function validateOrderData(data) {
  const required = ['email', 'totalPrice', 'shippingAddress'];
  
  for (const field of required) {
    if (!data[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  // Validate shipping address fields
  const addrRequired = ['firstName', 'lastName', 'address1', 'city', 'province', 'zip'];
  for (const field of addrRequired) {
    if (!data.shippingAddress[field]) {
      return { valid: false, error: `Missing shipping address field: ${field}` };
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Validate price is positive number
  if (typeof data.totalPrice !== 'number' || data.totalPrice <= 0) {
    return { valid: false, error: 'Invalid price' };
  }

  // Validate weight if provided
  if (data.shippingWeightGrams !== undefined) {
    if (typeof data.shippingWeightGrams !== 'number' || data.shippingWeightGrams < 0) {
      return { valid: false, error: 'Invalid shipping weight' };
    }
  }

  return { valid: true };
}

/**
 * Create Draft Order via Shopify GraphQL Admin API
 */
async function createShopifyDraftOrder(orderData, env) {
  const shop = env.SHOPIFY_SHOP;
  const accessToken = env.SHOPIFY_ACCESS_TOKEN;

  if (!shop || !accessToken) {
    return { error: 'Shopify credentials not configured' };
  }

  const endpoint = `https://${shop}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

  // Build line item title
  const lineItemTitle = orderData.documentName 
    ? `Printed & Bound - ${orderData.documentName}`
    : 'Custom Print Job';

  // Build custom attributes for print specs
  const customAttributes = [
    { key: 'Page Count', value: String(orderData.pageCount || 0) },
    { key: 'B&W Pages', value: String(orderData.bwPages || orderData.pageCount || 0) },
    { key: 'Color Pages', value: String(orderData.colorPages || 0) },
    { key: 'Binding', value: orderData.bindingType || 'None' },
    { key: 'Fold-outs', value: String(orderData.foldoutCount || 0) },
    { key: 'Laminated Pages', value: String(orderData.laminationPages || 0) },
    { key: 'Heavy Cover', value: orderData.heavyCover ? 'Yes' : 'No' },
    { key: 'Divider Tabs', value: String(orderData.dividerTabs || 0) },
    { key: 'Quantity', value: String(orderData.quantity || 1) },
    { key: 'Source', value: 'print.esscoaircraft.com' },
  ];

  // Build order note with all specs
  const orderNote = [
    '=== PRINT SPECIFICATIONS ===',
    `Document: ${orderData.documentName || 'Not specified'}`,
    `Total Pages: ${orderData.pageCount || 0}`,
    `B&W Pages: ${orderData.bwPages || orderData.pageCount || 0}`,
    `Color Pages: ${orderData.colorPages || 0}`,
    `Binding: ${orderData.bindingType || 'None'}`,
    orderData.foldoutCount > 0 ? `Fold-outs: ${orderData.foldoutCount}` : null,
    orderData.laminationPages > 0 ? `Lamination: ${orderData.laminationPages} pages` : null,
    orderData.heavyCover ? 'Heavy Card Stock Cover: Yes' : null,
    orderData.dividerTabs > 0 ? `Divider Tabs: ${orderData.dividerTabs}` : null,
    '',
    `Quantity: ${orderData.quantity || 1}`,
    `Estimated Weight: ${orderData.shippingWeightGrams ? (orderData.shippingWeightGrams / 453.592).toFixed(2) + ' lbs' : 'Not calculated'}`,
    '',
    'Submitted from: print.esscoaircraft.com',
  ].filter(Boolean).join('\n');

  // GraphQL mutation with weight field
  const mutation = `
    mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          name
          invoiceUrl
          totalWeight
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const addr = orderData.shippingAddress;
  
  // Build line item with weight for carrier-calculated shipping
  const lineItem = {
    title: lineItemTitle,
    quantity: orderData.quantity || 1,
    originalUnitPrice: String(orderData.totalPrice),
    requiresShipping: true, // CRITICAL: Enables shipping calculation
    taxable: true,
    customAttributes: customAttributes,
  };

  // Add weight if provided (for carrier-calculated shipping)
  if (orderData.shippingWeightGrams && orderData.shippingWeightGrams > 0) {
    lineItem.weight = {
      unit: 'GRAMS',
      value: Math.ceil(orderData.shippingWeightGrams)
    };
  }

  const variables = {
    input: {
      email: orderData.email,
      note: orderNote,
      shippingAddress: {
        firstName: addr.firstName,
        lastName: addr.lastName,
        company: addr.company || null,
        address1: addr.address1,
        address2: addr.address2 || null,
        city: addr.city,
        province: addr.province,
        zip: addr.zip,
        country: addr.country || 'US', // Default to US (US-only shipping)
        phone: addr.phone || null,
      },
      billingAddress: {
        firstName: addr.firstName,
        lastName: addr.lastName,
        company: addr.company || null,
        address1: addr.address1,
        address2: addr.address2 || null,
        city: addr.city,
        province: addr.province,
        zip: addr.zip,
        country: addr.country || 'US',
        phone: addr.phone || null,
      },
      lineItems: [lineItem],
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Shopify API error:', response.status, text);
      return { error: `Shopify API returned ${response.status}` };
    }

    const result = await response.json();

    // Check for GraphQL errors
    if (result.errors && result.errors.length > 0) {
      console.error('GraphQL errors:', result.errors);
      return { error: result.errors.map(e => e.message).join(', ') };
    }

    // Check for user errors
    const userErrors = result.data?.draftOrderCreate?.userErrors;
    if (userErrors && userErrors.length > 0) {
      console.error('User errors:', userErrors);
      return { error: userErrors.map(e => `${e.field}: ${e.message}`).join(', ') };
    }

    const draftOrder = result.data?.draftOrderCreate?.draftOrder;
    if (!draftOrder) {
      return { error: 'No draft order returned from Shopify' };
    }

    return {
      id: draftOrder.id,
      name: draftOrder.name,
      invoiceUrl: draftOrder.invoiceUrl,
      totalWeight: draftOrder.totalWeight,
      total: draftOrder.totalPriceSet?.shopMoney?.amount,
    };

  } catch (error) {
    console.error('Network error:', error);
    return { error: `Network error: ${error.message}` };
  }
}

/**
 * Helper to create JSON responses with CORS headers
 */
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
