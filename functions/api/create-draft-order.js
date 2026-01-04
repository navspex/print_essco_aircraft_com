/**
 * ESSCO Print Calculator - Shopify Draft Order API
 * Cloudflare Pages Function
 * 
 * Endpoint: POST /api/create-draft-order
 * 
 * Environment Variables Required:
 * - SHOPIFY_SHOP: esscoair-craft.myshopify.com
 * - SHOPIFY_ACCESS_TOKEN: shpat_xxxxx
 * 
 * Created: January 4, 2026
 * Shopify API Version: 2025-10
 */

const SHOPIFY_API_VERSION = '2025-10';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    
    // Validate required fields
    const validation = validateOrderData(body);
    if (!validation.valid) {
      return jsonResponse({ error: validation.error }, 400);
    }

    // Create Draft Order via Shopify GraphQL API
    const draftOrder = await createShopifyDraftOrder(env, body);

    if (draftOrder.error) {
      console.error('Shopify API Error:', draftOrder.error);
      return jsonResponse({ error: 'Failed to create order', details: draftOrder.error }, 500);
    }

    // Return the checkout URL
    return jsonResponse({
      success: true,
      draftOrderId: draftOrder.id,
      checkoutUrl: draftOrder.invoiceUrl,
      orderName: draftOrder.name,
    }, 200);

  } catch (error) {
    console.error('API Error:', error);
    return jsonResponse({ error: 'Internal server error', message: error.message }, 500);
  }
}

// Handle OPTIONS for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * Validate incoming order data
 */
function validateOrderData(data) {
  if (!data.email || !isValidEmail(data.email)) {
    return { valid: false, error: 'Valid email address is required' };
  }
  
  if (!data.totalPrice || data.totalPrice <= 0) {
    return { valid: false, error: 'Total price must be greater than 0' };
  }
  
  if (!data.shippingAddress) {
    return { valid: false, error: 'Shipping address is required' };
  }
  
  const addr = data.shippingAddress;
  if (!addr.firstName || !addr.lastName) {
    return { valid: false, error: 'Customer name is required' };
  }
  
  if (!addr.address1 || !addr.city || !addr.province || !addr.zip) {
    return { valid: false, error: 'Complete shipping address is required' };
  }

  return { valid: true };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Create Draft Order via Shopify GraphQL Admin API
 */
async function createShopifyDraftOrder(env, orderData) {
  const shopDomain = env.SHOPIFY_SHOP;
  const accessToken = env.SHOPIFY_ACCESS_TOKEN;

  if (!shopDomain || !accessToken) {
    return { error: 'Shopify credentials not configured' };
  }

  const endpoint = `https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

  // Build the line item title
  const lineItemTitle = orderData.documentName 
    ? `Printed & Bound - ${orderData.documentName}`
    : 'Printed & Bound Document';

  // Build custom attributes for order details
  const customAttributes = [];
  
  if (orderData.pageCount) {
    customAttributes.push({ key: 'Total Pages', value: String(orderData.pageCount) });
  }
  if (orderData.colorPages) {
    customAttributes.push({ key: 'Color Pages', value: String(orderData.colorPages) });
  }
  if (orderData.bwPages) {
    customAttributes.push({ key: 'B&W Pages', value: String(orderData.bwPages) });
  }
  if (orderData.bindingType) {
    customAttributes.push({ key: 'Binding', value: orderData.bindingType });
  }
  if (orderData.foldoutCount > 0) {
    customAttributes.push({ key: 'Fold-out Pages', value: String(orderData.foldoutCount) });
  }
  if (orderData.laminationPages > 0) {
    customAttributes.push({ key: 'Laminated Pages', value: String(orderData.laminationPages) });
  }
  if (orderData.heavyCover) {
    customAttributes.push({ key: 'Heavy Cover', value: 'Yes' });
  }
  if (orderData.dividerTabs > 0) {
    customAttributes.push({ key: 'Divider Tabs', value: String(orderData.dividerTabs) });
  }

  // Build order note for merchant
  const orderNote = [
    '=== PRINT ON DEMAND ORDER ===',
    `Document: ${orderData.documentName || 'Uploaded PDF'}`,
    `Pages: ${orderData.pageCount || 'Unknown'}`,
    `B&W Pages: ${orderData.bwPages || 0}`,
    `Color Pages: ${orderData.colorPages || 0}`,
    `Binding: ${orderData.bindingType || 'None'}`,
    orderData.foldoutCount > 0 ? `Fold-outs: ${orderData.foldoutCount}` : null,
    orderData.laminationPages > 0 ? `Lamination: ${orderData.laminationPages} pages` : null,
    orderData.heavyCover ? 'Heavy Card Stock Cover: Yes' : null,
    orderData.dividerTabs > 0 ? `Divider Tabs: ${orderData.dividerTabs}` : null,
    '',
    `Quantity: ${orderData.quantity || 1}`,
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
      lineItems: [
        {
          title: lineItemTitle,
          quantity: orderData.quantity || 1,
          originalUnitPrice: String(orderData.totalPrice),
          customAttributes: customAttributes,
        }
      ],
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
      return { error: `Shopify API returned ${response.status}: ${text}` };
    }

    const result = await response.json();

    // Check for GraphQL errors
    if (result.errors && result.errors.length > 0) {
      return { error: result.errors.map(e => e.message).join(', ') };
    }

    // Check for user errors
    const userErrors = result.data?.draftOrderCreate?.userErrors;
    if (userErrors && userErrors.length > 0) {
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
      total: draftOrder.totalPriceSet?.shopMoney?.amount,
      currency: draftOrder.totalPriceSet?.shopMoney?.currencyCode,
    };

  } catch (error) {
    return { error: `Network error: ${error.message}` };
  }
}

/**
 * Helper to create JSON responses
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
