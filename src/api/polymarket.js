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
    try {
      let response;

      if (IS_PRODUCTION) {
        // Use Vercel API proxy in production
        response = await api.get(`/api/polymarket/events`, {
          params: {
            series_id: seriesId,
            closed: false,
            order: 'end_date_min',
            ascending: true,
            limit
          }
        });
      } else {
        // Use AllOrigins CORS proxy for local development
        const apiUrl = `${API_BASE}/events?series_id=${seriesId}&closed=false&order=end_date_min&ascending=true&limit=${limit}`;
        response = await api.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`);
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching league events:', error);
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
