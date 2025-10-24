export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { series_id, closed, order, ascending, limit } = req.query;

    const params = new URLSearchParams({
      series_id,
      closed: closed || 'false',
      order: order || 'end_date_min',
      ascending: ascending || 'true',
      limit: limit || '20'
    });

    const apiUrl = `https://gamma-api.polymarket.com/events?${params.toString()}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Polymarket API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch from Polymarket' });
  }
}
