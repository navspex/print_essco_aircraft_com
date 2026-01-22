// ESSCO POD Calculator - PDF Upload API
// Uses Cloudflare R2 native bindings (NOT AWS SDK)
// Stores PDF for production team access, auto-deletes after 7 days

interface Env {
  PRINT_ESSCO_STORAGE: R2Bucket;
}

interface UploadResponse {
  success: boolean;
  fileKey?: string;
  fileName?: string;
  fileSize?: number;
  downloadUrl?: string;
  error?: string;
}

// Maximum file size: 500MB
const MAX_FILE_SIZE = 500 * 1024 * 1024;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Check if R2 bucket is bound
    if (!env.PRINT_ESSCO_STORAGE) {
      console.error('R2 bucket PRINT_ESSCO_STORAGE is not bound');
      return Response.json(
        { success: false, error: 'Storage not configured' } as UploadResponse,
        { status: 500, headers: corsHeaders }
      );
    }
    
    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return Response.json(
        { success: false, error: 'No file provided' } as UploadResponse,
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Validate file type
    const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPDF) {
      return Response.json(
        { success: false, error: 'Only PDF files are allowed' } as UploadResponse,
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { success: false, error: 'File size exceeds 500MB limit' } as UploadResponse,
        { status: 400, headers: corsHeaders }
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
    const response: UploadResponse = {
      success: true,
      fileKey,
      fileName: file.name,
      fileSize: file.size,
    };
    
    return Response.json(response, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      } as UploadResponse,
      { status: 500, headers: corsHeaders }
    );
  }
};

// Handle OPTIONS for CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
