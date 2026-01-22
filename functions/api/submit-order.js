/**
 * ESSCO Print Calculator - Order Submission API
 * Cloudflare Pages Function
 * 
 * Accepts natural frontend data structure and transforms for Shopify
 * This is the PROPER interface between calculator and draft order API
 * 
 * Created: January 22, 2026
 */

const SHOPIFY_API_VERSION = '2025-10';

/**
 * Cloudflare Pages Function handler
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Parse frontend submission
    const submission = await request.json();

    // Validate required fields
    const validation = validateSubmission(submission);
    if (!validation.valid) {
      return jsonResponse({ error: validation.error }, 400);
    }

    // Transform to backend format
    const orderData = transformToBackendFormat(submission);

    // Call existing draft order API
    const result = await createDraftOrder(orderData, env);

    if (result.error) {
      return jsonResponse({ error: result.error }, 500);
    }

    // Success response with invoice URL for redirect
    return jsonResponse({
      success: true,
      invoiceUrl: result.invoiceUrl,
      orderId: result.draftOrderId,
      orderName: result.orderName,
    });

  } catch (error) {
    console.error('Order submission failed:', error);
    return jsonResponse({ error: error.message || 'Internal server error' }, 500);
  }
}

/**
 * Handle CORS preflight
 */
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Validate frontend submission
 */
function validateSubmission(data) {
  // Required top-level fields
  const required = ['customer', 'shipping', 'lineItems', 'totalPrice'];
  
  for (const field of required) {
    if (!data[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  // Validate customer
  if (!data.customer.email || !data.customer.firstName || !data.customer.lastName) {
    return { valid: false, error: 'Missing required customer information' };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.customer.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Validate shipping address
  const shipping = data.shipping;
  if (!shipping.address1 || !shipping.city || !shipping.state || !shipping.zip) {
    return { valid: false, error: 'Missing required shipping information' };
  }

  // Validate price
  const price = parseFloat(data.totalPrice);
  if (isNaN(price) || price <= 0) {
    return { valid: false, error: 'Invalid price' };
  }

  return { valid: true };
}

/**
 * Transform frontend format to backend draft order format
 */
function transformToBackendFormat(submission) {
  const { customer, shipping, lineItems, totalPrice, estimatedWeight } = submission;

  // Extract print specs from first line item's properties
  const specs = lineItems[0]?.properties || {};

  return {
    // Top-level fields backend expects
    email: customer.email,
    totalPrice: parseFloat(totalPrice),
    
    // Shipping address (rename state -> province)
    shippingAddress: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      address1: shipping.address1,
      address2: shipping.address2 || null,
      city: shipping.city,
      province: shipping.state, // Backend calls it "province"
      zip: shipping.zip,
      country: shipping.country || 'US',
      phone: customer.phone || null,
      company: customer.company || null,
    },

    // Print specifications
    documentName: specs.fileName || 'Custom Print Job',
    pageCount: parseInt(specs.pageCount) || 0,
    bwPages: calculateBwPages(specs),
    colorPages: parseInt(specs.colorPages) || 0,
    bindingType: specs.binding || 'none',
    foldoutCount: parseInt(specs.foldoutCount) || 0,
    laminationPages: parseInt(specs.laminationCount) || 0,
    heavyCover: specs.heavyCover === true || specs.heavyCover === 'true',
    dividerTabs: parseInt(specs.dividerTabs) || 0,
    quantity: parseInt(specs.copies) || 1,
    
    // Weight conversion (lbs to grams)
    shippingWeightGrams: estimatedWeight ? Math.round(estimatedWeight * 453.592) : null,
  };
}

/**
 * Calculate B&W pages (total - color - foldouts)
 */
function calculateBwPages(specs) {
  const total = parseInt(specs.pageCount) || 0;
  const color = parseInt(specs.colorPages) || 0;
  const foldouts = parseInt(specs.foldoutCount) || 0;
  return Math.max(0, total - color - foldouts);
}

/**
 * Call existing draft order creation API
 */
async function createDraftOrder(orderData, env) {
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
    { key: 'B&W Pages', value: String(orderData.bwPages || 0) },
    { key: 'Color Pages', value: String(orderData.colorPages || 0) },
    { key: 'Binding', value: orderData.bindingType || 'None' },
    { key: 'Fold-outs', value: String(orderData.foldoutCount || 0) },
    { key: 'Laminated Pages', value: String(orderData.laminationPages || 0) },
    { key: 'Heavy Cover', value: orderData.heavyCover ? 'Yes' : 'No' },
    { key: 'Divider Tabs', value: String(orderData.dividerTabs || 0) },
    { key: 'Quantity', value: String(orderData.quantity || 1) },
    { key: 'Source', value: 'print.esscoaircraft.com' },
  ];

  // Build order note
  const orderNote = [
    '=== PRINT SPECIFICATIONS ===',
    `Document: ${orderData.documentName || 'Not specified'}`,
    `Total Pages: ${orderData.pageCount || 0}`,
    `B&W Pages: ${orderData.bwPages || 0}`,
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

  // GraphQL mutation
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
  
  // Build line item with weight
  const lineItem = {
    title: lineItemTitle,
    quantity: orderData.quantity || 1,
    originalUnitPrice: String(orderData.totalPrice),
    requiresShipping: true,
    taxable: true,
    customAttributes: customAttributes,
  };

  // Add weight if provided
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
        country: addr.country || 'US',
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
      draftOrderId: draftOrder.id,
      orderName: draftOrder.name,
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
