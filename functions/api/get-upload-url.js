/**
 * ESSCO POD Calculator - Presigned URL Generator
 * Cloudflare Pages Function
 * 
 * Generates a presigned PUT URL for direct browser-to-R2 uploads.
 * Bypasses the 100MB Cloudflare CDN request body limit by having
 * the browser PUT directly to R2's S3-compatible endpoint.
 * 
 * Required env vars: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
 * Account ID: 13d315bc593c7c736ee2324525b2b15d
 */

import { AwsClient } from 'aws4fetch';

const ACCOUNT_ID = '13d315bc593c7c736ee2324525b2b15d';

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Validate credentials exist
    if (!env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY) {
      console.error('Missing R2 S3 API credentials');
      return new Response(
        JSON.stringify({ success: false, error: 'Storage credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { fileName, fileSize, contentType } = body;

    if (!fileName) {
      return new Response(
        JSON.stringify({ success: false, error: 'fileName is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique file key (same pattern as upload-pdf.js)
    const timestamp = Date.now();
    const randomId = crypto.randomUUID();
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 50);
    const fileKey = `uploads/${timestamp}-${randomId}-${sanitizedName}`;

    // Create AWS client for R2
    const r2 = new AwsClient({
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    });

    const bucketName = env.R2_BUCKET_NAME || 'print-essco-storage';
    const r2Endpoint = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;
    
    // Build URL with expiry parameter
    const objectUrl = new URL(`${r2Endpoint}/${bucketName}/${fileKey}`);
    objectUrl.searchParams.set('X-Amz-Expires', '3600'); // 1 hour

    // Sign a PUT request (presigned URL — browser uploads directly to R2)
    const signed = await r2.sign(
      new Request(objectUrl.toString(), {
        method: 'PUT',
        headers: {
          'Content-Type': contentType || 'application/pdf',
        },
      }),
      {
        aws: { signQuery: true },
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        uploadUrl: signed.url,
        fileKey: fileKey,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Presigned URL error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Failed to generate upload URL' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
