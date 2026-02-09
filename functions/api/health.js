/**
 * Health Check Endpoint
 * GET /api/health
 * Updated: Session 31 - R2 bindings active
 */

export async function onRequestGet() {
  return new Response(JSON.stringify({
    status: 'ok',
    service: 'ESSCO Print Calculator API',
    timestamp: new Date().toISOString(),
    version: '1.0.1',
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://print.esscoaircraft.com',
    },
  });
}
