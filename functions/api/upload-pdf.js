/**
 * ESSCO Print Calculator - File Upload API
 * Cloudflare Pages Function with R2 native bindings
 * Stores files for production team access
 * 
 * Accepts: PDF, JPEG, PNG, TIFF, WebP
 * R2 Bucket: print-essco-storage
 * Binding: PRINT_ESSCO_STORAGE
 * 
 * Updated: February 7, 2026
 * - Accept image uploads (JPEG, PNG, TIFF, WebP) for poster calculator
 * - Previous: PDF-only uploads
 */

// Maximum file size: 500MB
const MAX_FILE_SIZE = 500 * 1024 * 1024;

// Accepted file types
const ACCEPTED_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/tiff',
  'image/webp',
]);

// Accepted extensions (fallback if MIME type is missing)
const ACCEPTED_EXTENSIONS = /\.(pdf|jpe?g|png|tiff?|webp)$/i;

export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  try {
    // Check if R2 bucket is bound
    if (!env.PRINT_ESSCO_STORAGE) {
      console.error('R2 bucket PRINT_ESSCO_STORAGE is not bound');
      return new Response(
        JSON.stringify({ success: false, error: 'Storage not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get form data
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return new Response(
        JSON.stringify({ success: false, error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate file type (accept PDFs and images)
    const isAcceptedType = ACCEPTED_TYPES.has(file.type) || ACCEPTED_EXTENSIONS.test(file.name);
    if (!isAcceptedType) {
      return new Response(
        JSON.stringify({ success: false, error: 'File type not accepted. Allowed: PDF, JPEG, PNG, TIFF, WebP' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ success: false, error: 'File size exceeds 500MB limit' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate unique file key
    const timestamp = Date.now();
    const randomId = crypto.randomUUID();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 50);
    const fileKey = `uploads/${timestamp}-${randomId}-${sanitizedName}`;
    
    // Get file content
    const fileContent = await file.arrayBuffer();
    
    // Determine content type for R2 metadata
    const contentType = file.type || 'application/octet-stream';
    
    // Upload to R2
    await env.PRINT_ESSCO_STORAGE.put(fileKey, fileContent, {
      httpMetadata: {
        contentType: contentType,
      },
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });
    
    // Return success with file key
    return new Response(
      JSON.stringify({
        success: true,
        fileKey: fileKey,
        fileName: file.name,
        fileSize: file.size,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Upload failed' 
      }),
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
