/**
 * ESSCO Print Calculator - R2 PDF Upload API
 * Cloudflare Pages Function
 * 
 * Accepts PDF uploads and stores them in R2 bucket
 * Returns file URL for order processing
 * 
 * Created: January 21, 2026
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file');
    const customerEmail = formData.get('email') || 'unknown';

    if (!file) {
      return jsonResponse({ error: 'No file provided' }, 400);
    }

    // Validate PDF
    if (file.type !== 'application/pdf') {
      return jsonResponse({ error: 'Only PDF files are allowed' }, 400);
    }

    // Validate file size (500MB max)
    const MAX_SIZE = 500 * 1024 * 1024; // 500MB in bytes
    if (file.size > MAX_SIZE) {
      return jsonResponse({ error: 'File too large. Maximum size is 500MB' }, 400);
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedEmail = customerEmail.replace(/[^a-zA-Z0-9]/g, '_');
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${timestamp}_${sanitizedEmail}_${originalName}`;

    // Configure S3 client for R2
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: env.R2_ENDPOINT,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
      },
    });

    // Convert file to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();

    // Upload to R2
    const uploadCommand = new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: filename,
      Body: new Uint8Array(fileBuffer),
      ContentType: 'application/pdf',
      Metadata: {
        'customer-email': customerEmail,
        'upload-timestamp': timestamp,
        'original-filename': file.name,
      },
    });

    await s3Client.send(uploadCommand);

    // Construct file URL (R2 bucket URL + filename)
    const fileUrl = `${env.R2_ENDPOINT}/${env.R2_BUCKET_NAME}/${filename}`;

    // Success response
    return jsonResponse({
      success: true,
      filename: filename,
      fileUrl: fileUrl,
      fileSize: file.size,
      uploadTimestamp: timestamp,
    });

  } catch (error) {
    console.error('PDF upload failed:', error);
    return jsonResponse({ 
      error: error.message || 'Upload failed',
      details: error.toString()
    }, 500);
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
