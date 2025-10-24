export default async function handler(req, res) {
  console.log('[API] Request received:', {
    method: req.method,
    query: req.query,
    url: req.url
  });

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('[API] OPTIONS request - returning 200');
    return res.status(200).end();
  }

  try {
    const { series_id, closed, limit } = req.query;

    console.log('[API] Parsed query params:', { series_id, closed, limit });

    const params = new URLSearchParams({
      series_id,
      closed: closed || 'false',
      limit: limit || '20'
    });

    const apiUrl = `https://gamma-api.polymarket.com/events?${params.toString()}`;
    console.log('[API] Fetching from Polymarket:', apiUrl);

    const response = await fetch(apiUrl);
    console.log('[API] Polymarket response status:', response.status);

    const data = await response.json();
    console.log('[API] Polymarket response data:', {
      dataType: Array.isArray(data) ? 'array' : typeof data,
      length: Array.isArray(data) ? data.length : 'N/A',
      keys: typeof data === 'object' ? Object.keys(data) : 'N/A'
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('[API] ERROR:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({
      error: 'Failed to fetch from Polymarket',
      details: error.message
    });
  }
}
