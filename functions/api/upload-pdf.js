/**
 * ESSCO Print Calculator - R2 PDF Upload API (Cloudflare Bindings)
 * Cloudflare Pages Function
 * 
 * Accepts PDF uploads and stores them in R2 bucket using native Cloudflare bindings
 * Returns file URL for order processing
 * 
 * Updated: January 22, 2026 - Session 31
 * Changed from AWS SDK to Cloudflare R2 bindings to fix SSL cert error
 */

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
 * Cloudflare Pages Function handler - POST only
 * Uses R2 binding for direct bucket access (no AWS SDK needed)
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Validate R2 binding exists
    if (!env.PRINT_ESSCO_STORAGE) {
      return jsonResponse({ 
        error: 'R2 bucket binding not configured',
        hint: 'Add PRINT_ESSCO_STORAGE binding in Cloudflare dashboard'
      }, 500);
    }

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
      return jsonResponse({ 
        error: `File too large. Maximum size is 500MB. Your file: ${(file.size / 1024 / 1024).toFixed(2)}MB` 
      }, 400);
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedEmail = customerEmail.replace(/[^a-zA-Z0-9]/g, '_');
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${timestamp}_${sanitizedEmail}_${originalName}`;

    // Convert file to ArrayBuffer for R2
    const fileBuffer = await file.arrayBuffer();

    // Upload to R2 using native Cloudflare binding
    // This bypasses AWS SDK completely and uses Workers R2 API
    const uploadResult = await env.PRINT_ESSCO_STORAGE.put(filename, fileBuffer, {
      httpMetadata: {
        contentType: 'application/pdf',
      },
      customMetadata: {
        'customer-email': customerEmail,
        'upload-timestamp': timestamp,
        'original-filename': file.name,
        'file-size-bytes': file.size.toString(),
      },
    });

    // Verify upload succeeded
    if (!uploadResult) {
      throw new Error('R2 upload returned null - upload may have failed');
    }

    // Construct file URL for R2 bucket
    // Format: https://<account-id>.r2.cloudflarestorage.com/<bucket>/<filename>
    // Note: This is the internal R2 URL, not publicly accessible unless bucket is public
    const fileUrl = `https://${env.R2_ENDPOINT}/${filename}`;

    // Success response
    return jsonResponse({
      success: true,
      filename: filename,
      fileUrl: fileUrl,
      fileSize: file.size,
      uploadTimestamp: timestamp,
      etag: uploadResult.etag,
      httpEtag: uploadResult.httpEtag,
      message: 'PDF uploaded successfully to R2',
    });

  } catch (error) {
    console.error('PDF upload failed:', error);
    
    // Detailed error logging for debugging
    const errorDetails = {
      error: error.message || 'Upload failed',
      type: error.name || 'UnknownError',
      stack: error.stack,
    };

    return jsonResponse({ 
      error: 'Failed to upload PDF to R2',
      details: errorDetails,
      hint: 'Check Cloudflare Pages Functions logs for more information'
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
