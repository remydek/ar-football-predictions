import axios from 'axios';

const API_BASE = 'https://gamma-api.polymarket.com';
const IS_PRODUCTION = import.meta.env.PROD;

// Create axios instance
const api = axios.create({
  timeout: 30000,
});

export const polymarketAPI = {
  // Fetch events for a specific league series
  async getLeagueEvents(seriesId, limit = 20) {
    console.log('[CLIENT] getLeagueEvents called:', { seriesId, limit, IS_PRODUCTION });

    try {
      let response;

      if (IS_PRODUCTION) {
        // Use Vercel API proxy in production
        const url = `/api/polymarket/events`;
        const params = {
          series_id: seriesId,
          closed: false,
          order: 'end_date_min',
          ascending: true,
          limit
        };

        console.log('[CLIENT] Production - calling Vercel API:', { url, params });
        response = await api.get(url, { params });
        console.log('[CLIENT] Production response:', {
          status: response.status,
          dataType: Array.isArray(response.data) ? 'array' : typeof response.data,
          length: Array.isArray(response.data) ? response.data.length : 'N/A'
        });
      } else {
        // Use AllOrigins CORS proxy for local development
        const apiUrl = `${API_BASE}/events?series_id=${seriesId}&closed=false&order=end_date_min&ascending=true&limit=${limit}`;
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

        console.log('[CLIENT] Local dev - using CORS proxy:', { apiUrl, proxyUrl });
        response = await api.get(proxyUrl);
        console.log('[CLIENT] Local dev response:', {
          status: response.status,
          dataType: Array.isArray(response.data) ? 'array' : typeof response.data,
          length: Array.isArray(response.data) ? response.data.length : 'N/A'
        });
      }

      return response.data;
    } catch (error) {
      console.error('[CLIENT] ERROR fetching league events:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : 'No response',
        seriesId,
        limit
      });
      throw error;
    }
  },

  // Parse match data from event
  parseMatchFromEvent(event) {
    const vsMatch = event.title.match(/(.+)\s+vs\s+(.+)/i);
    let homeTeam = 'Team 1';
    let awayTeam = 'Team 2';

    if (vsMatch) {
      homeTeam = vsMatch[1].trim();
      awayTeam = vsMatch[2].trim();
    }

    return {
      id: event.id,
      homeTeam,
      awayTeam,
      date: event.endDate,
      markets: event.markets || [],
      image: event.image,
      slug: event.slug,
    };
  }
};
