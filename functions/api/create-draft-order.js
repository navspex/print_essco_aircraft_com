/**
 * ESSCO Print Calculator - Shopify Draft Order API
 * Cloudflare Pages Function
 * 
 * Creates Shopify Draft Orders with:
 * - Custom line items (print specifications)
 * - Calculated shipping weight (for carrier-calculated rates)
 * - Customer email and shipping address
 * - R2 PDF file key for production team
 * - Presigned download URL (7-day expiry) for production team
 * - Optional shipping line for poster tube shipping
 * 
 * Updated: February 9, 2026
 * - Added presigned R2 download URL in order notes (7-day expiry)
 * - Production team gets clickable link instead of raw R2 key
 * - Previous: Added shippingLine support for poster tube shipping charges
 * - Previous: Added poster-specific note formatting and custom attributes
 * - Previous: Added Page Size to custom attributes and order note
 * - Previous: Added pdfFileKey for R2 storage reference
 * 
 * API Version: 2026-01 (latest stable)
 */

import { AwsClient } from 'aws4fetch';

const SHOPIFY_API_VERSION = '2026-01';
const R2_ACCOUNT_ID = '13d315bc593c7c736ee2324525b2b15d';

/**
 * Generate a presigned GET URL for R2 file download
 * Expires in 7 days (604800 seconds) — production team has a full week
 */
async function generateDownloadUrl(fileKey, env) {
  if (!fileKey || !env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY) {
    return null;
  }

  try {
    const r2 = new AwsClient({
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    });

    const bucketName = env.R2_BUCKET_NAME || 'print-essco-storage';
    const r2Endpoint = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

    const objectUrl = new URL(`${r2Endpoint}/${bucketName}/${fileKey}`);
    objectUrl.searchParams.set('X-Amz-Expires', '604800'); // 7 days

    const signed = await r2.sign(
      new Request(objectUrl.toString(), {
        method: 'GET',
      }),
      {
        aws: { signQuery: true },
      }
    );

    return signed.url;
  } catch (error) {
    console.error('Failed to generate download URL:', error);
    return null;
  }
}

/**
 * Cloudflare Pages Function handler
 */
export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': 'https://print.esscoaircraft.com',
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

    // Build Shopify Draft Order
    const result = await createDraftOrder(orderData, env);

    if (result.success) {
      return jsonResponse({
        success: true,
        draftOrderId: result.draftOrderId,
        checkoutUrl: result.checkoutUrl,
        orderName: result.orderName,
      });
    } else {
      return jsonResponse({ error: result.error }, 500);
    }

  } catch (error) {
    console.error('Draft order creation failed:', error);
    return jsonResponse({ error: 'Failed to create order' }, 500);
  }
}

/**
 * JSON response helper
 */
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://print.esscoaircraft.com',
    },
  });
}

/**
 * Validate order data
 */
function validateOrderData(orderData) {
  if (!orderData.totalPrice || orderData.totalPrice <= 0) {
    return { valid: false, error: 'Invalid total price' };
  }

  // Email is optional - Shopify checkout will collect it
  // Shipping address is also optional - Shopify checkout will collect it

  return { valid: true };
}

/**
 * Detect if this is a poster order based on request fields
 */
function isPosterOrder(orderData) {
  return orderData.bindingType === 'Poster Print' || !!orderData.posterSize;
}

/**
 * Build custom attributes for poster orders
 */
function buildPosterAttributes(orderData, downloadUrl) {
  return [
    { key: 'Product Type', value: 'Poster Print' },
    { key: 'Poster Size', value: orderData.posterSize || orderData.pageSize || 'Not specified' },
    { key: 'Quantity', value: String(orderData.quantity || 1) },
    { key: 'Lamination', value: orderData.lamination === 'Yes' ? 'Yes ($15)' : 'No' },
    { key: 'Foam Board', value: orderData.foamBoard === 'Yes' ? 'Yes ($20)' : 'No' },
    { key: 'Add-Ons', value: orderData.addOns || 'None' },
    { key: 'Shipping Tube', value: orderData.shippingTube || 'Standard' },
    { key: 'Image Dimensions', value: `${orderData.imageWidth || 'N/A'} × ${orderData.imageHeight || 'N/A'} px` },
    { key: 'File Name', value: orderData.documentName || 'Not specified' },
    { key: 'File Key', value: orderData.pdfFileKey || 'Not uploaded' },
    { key: 'Download Link', value: downloadUrl || 'Not available' },
    { key: 'Weight (grams)', value: String(orderData.shippingWeightGrams || 0) },
    { key: 'Source', value: 'print.esscoaircraft.com' },
  ];
}

/**
 * Build order note for poster orders (production team reference)
 */
function buildPosterNote(orderData, downloadUrl) {
  return [
    '=== POSTER PRINT SPECIFICATIONS ===',
    `File: ${orderData.documentName || 'Not specified'}`,
    `Poster Size: ${orderData.posterSize || orderData.pageSize || 'Not specified'}`,
    `Quantity: ${orderData.quantity || 1}`,
    '',
    '--- Add-Ons ---',
    `Lamination: ${orderData.lamination === 'Yes' ? 'YES — Gloss Lamination ($15/ea)' : 'No'}`,
    `Foam Board: ${orderData.foamBoard === 'Yes' ? 'YES — 3/16" Foam Core Mount ($20/ea)' : 'No'}`,
    '',
    '--- Shipping ---',
    `Tube: ${orderData.shippingTube || 'Standard'}`,
    `Tube Price: $${orderData.shippingTubePrice || '0.00'}`,
    `Est. Weight: ${orderData.shippingWeightGrams ? (orderData.shippingWeightGrams / 453.592).toFixed(2) + ' lbs' : 'Not calculated'}`,
    '',
    '--- Image Info ---',
    `Dimensions: ${orderData.imageWidth || 'N/A'} × ${orderData.imageHeight || 'N/A'} px`,
    '',
    '=== DOWNLOAD FILE ===',
    downloadUrl ? `>>> CLICK TO DOWNLOAD: ${downloadUrl}` : 'Download link not available',
    downloadUrl ? '>>> Link expires in 7 days from order creation' : '',
    '',
    '=== FILE STORAGE (backup) ===',
    orderData.pdfFileKey ? `R2 Key: ${orderData.pdfFileKey}` : 'File not uploaded',
    orderData.pdfFileKey ? `Bucket: print-essco-storage` : '',
    '',
    'Submitted from: print.esscoaircraft.com',
  ].filter(Boolean).join('\\n');
}

/**
 * Build custom attributes for PDF/document orders (original behavior)
 */
function buildPrintAttributes(orderData, downloadUrl) {
  return [
    { key: 'Document Name', value: orderData.documentName || 'Not specified' },
    { key: 'Total Pages', value: String(orderData.pageCount || 0) },
    { key: 'B&W Pages', value: String(orderData.bwPages || 0) },
    { key: 'Color Pages', value: String(orderData.colorPages || 0) },
    { key: 'Page Size', value: orderData.pageSize || 'Letter (8.5" × 11")' },
    { key: 'Binding', value: orderData.bindingType || 'None' },
    { key: 'Cover', value: orderData.coverType || 'None' },
    { key: 'Tabs', value: orderData.hasTabs ? 'Yes (5-tab set)' : 'No' },
    { key: 'Print Mode', value: orderData.printMode || 'double-sided' },
    { key: 'Fold-outs', value: String(orderData.foldoutCount || 0) },
    { key: 'Quantity', value: String(orderData.quantity || 1) },
    { key: 'Weight (grams)', value: String(orderData.shippingWeightGrams || 0) },
    { key: 'PDF File Key', value: orderData.pdfFileKey || 'Not uploaded' },
    { key: 'Download Link', value: downloadUrl || 'Not available' },
    { key: 'Source', value: 'print.esscoaircraft.com' },
  ];
}

/**
 * Build order note for PDF/document orders (original behavior)
 */
function buildPrintNote(orderData, downloadUrl) {
  return [
    '=== PRINT SPECIFICATIONS ===',
    `Document: ${orderData.documentName || 'Not specified'}`,
    `Total Pages: ${orderData.pageCount || 0}`,
    `Page Size: ${orderData.pageSize || 'Letter (8.5" × 11")'}`,
    `B&W Pages: ${orderData.bwPages || 0}`,
    `Color Pages: ${orderData.colorPages || 0}`,
    `Binding: ${orderData.bindingType || 'None'}`,
    `Cover: ${orderData.coverType || 'None'}`,
    `Tabs: ${orderData.hasTabs ? 'Yes (5-tab set)' : 'No'}`,
    `Print Mode: ${orderData.printMode || 'double-sided'}`,
    orderData.foldoutCount > 0 ? `Fold-outs: ${orderData.foldoutCount}` : null,
    '',
    `Quantity: ${orderData.quantity || 1}`,
    `Estimated Weight: ${orderData.shippingWeightGrams ? (orderData.shippingWeightGrams / 453.592).toFixed(2) + ' lbs' : 'Not calculated'}`,
    '',
    '=== DOWNLOAD FILE ===',
    downloadUrl ? `>>> CLICK TO DOWNLOAD: ${downloadUrl}` : 'Download link not available',
    downloadUrl ? '>>> Link expires in 7 days from order creation' : '',
    '',
    '=== FILE STORAGE (backup) ===',
    orderData.pdfFileKey ? `R2 Key: ${orderData.pdfFileKey}` : 'PDF not uploaded',
    orderData.pdfFileKey ? `Bucket: print-essco-storage` : '',
    '',
    'Submitted from: print.esscoaircraft.com',
  ].filter(Boolean).join('\\n');
}

/**
 * Create Shopify Draft Order via GraphQL API
 */
async function createDraftOrder(orderData, env) {
  const shopifyShop = env.SHOPIFY_SHOP || 'essco-aircraft.myshopify.com';
  const accessToken = env.SHOPIFY_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('SHOPIFY_ACCESS_TOKEN not configured');
    return { success: false, error: 'Shopify configuration error' };
  }

  // Generate presigned download URL for production team
  const downloadUrl = orderData.pdfFileKey
    ? await generateDownloadUrl(orderData.pdfFileKey, env)
    : null;

  // Detect order type and build appropriate metadata
  const isPoster = isPosterOrder(orderData);
  const customAttributes = isPoster ? buildPosterAttributes(orderData, downloadUrl) : buildPrintAttributes(orderData, downloadUrl);
  const orderNote = isPoster ? buildPosterNote(orderData, downloadUrl) : buildPrintNote(orderData, downloadUrl);

  // Build line item title
  const lineItemTitle = isPoster
    ? `Poster Print — ${orderData.posterSize || orderData.pageSize || 'Custom'}`
    : `Custom Print Job - ${orderData.documentName || 'Document'}`;

  // Determine tags
  const tags = isPoster
    ? ['poster-calculator', 'print-esscoaircraft-com']
    : ['pod-calculator', 'print-esscoaircraft-com'];

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

  // Build line item
  const lineItem = {
    title: lineItemTitle,
    quantity: orderData.quantity || 1,
    originalUnitPrice: String(orderData.totalPrice),
    requiresShipping: true,
    taxable: true,
    customAttributes: customAttributes,
  };

  // Build input for GraphQL
  const input = {
    lineItems: [lineItem],
    note: orderNote,
    tags: tags,
    customAttributes: [
      { key: '_source', value: 'print.esscoaircraft.com' },
      { key: '_pdfFileKey', value: orderData.pdfFileKey || '' },
      { key: '_downloadUrl', value: downloadUrl || '' },
      { key: '_orderType', value: isPoster ? 'poster' : 'print' },
    ],
  };

  // Add shipping line if provided (used for poster tube shipping)
  if (orderData.shippingTitle && orderData.shippingCost && orderData.shippingCost > 0) {
    input.shippingLine = {
      title: orderData.shippingTitle,
      price: String(orderData.shippingCost),
    };
  }

  // Add email if provided
  if (orderData.email) {
    input.email = orderData.email;
  }

  // Add shipping address if provided
  if (orderData.shippingAddress) {
    const addr = orderData.shippingAddress;
    input.shippingAddress = {
      firstName: addr.firstName || '',
      lastName: addr.lastName || '',
      address1: addr.address1 || '',
      address2: addr.address2 || '',
      city: addr.city || '',
      province: addr.province || '',
      zip: addr.zip || '',
      country: addr.country || 'US',
      phone: addr.phone || '',
    };
  }

  // Make GraphQL request
  const response = await fetch(
    `https://${shopifyShop}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query: mutation,
        variables: { input },
      }),
    }
  );

  if (!response.ok) {
    console.error('Shopify API error:', response.status, await response.text());
    return { success: false, error: 'Shopify API request failed' };
  }

  const data = await response.json();

  // Check for user errors
  if (data.data?.draftOrderCreate?.userErrors?.length > 0) {
    const errors = data.data.draftOrderCreate.userErrors;
    console.error('Shopify user errors:', errors);
    return { success: false, error: errors[0].message };
  }

  // Check for draft order
  const draftOrder = data.data?.draftOrderCreate?.draftOrder;
  if (!draftOrder) {
    console.error('No draft order returned:', data);
    return { success: false, error: 'Failed to create draft order' };
  }

  return {
    success: true,
    draftOrderId: draftOrder.id,
    checkoutUrl: draftOrder.invoiceUrl,
    orderName: draftOrder.name,
  };
}
