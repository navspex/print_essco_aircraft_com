/**
 * Health Check Endpoint
 * GET /api/health
 */

export async function onRequestGet() {
  return new Response(JSON.stringify({
    status: 'ok',
    service: 'ESSCO Print Calculator API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
