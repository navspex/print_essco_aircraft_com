/**
 * ESSCO POD Calculator - PDF Upload API
 * Cloudflare Pages Function with R2 native bindings
 * Stores PDF for production team access
 * 
 * R2 Bucket: print-essco-storage
 * Binding: PRINT_ESSCO_STORAGE
 */

// Maximum file size: 500MB
const MAX_FILE_SIZE = 500 * 1024 * 1024;

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
    
    // Validate file type
    const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPDF) {
      return new Response(
        JSON.stringify({ success: false, error: 'Only PDF files are allowed' }),
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
    
    // Upload to R2
    await env.PRINT_ESSCO_STORAGE.put(fileKey, fileContent, {
      httpMetadata: {
        contentType: 'application/pdf',
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
