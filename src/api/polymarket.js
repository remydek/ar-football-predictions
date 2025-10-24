import axios from 'axios';

const API_BASE = 'https://gamma-api.polymarket.com';

// Create axios instance
const api = axios.create({
  timeout: 30000,
});

export const polymarketAPI = {
  // Fetch events for a specific league series
  async getLeagueEvents(seriesId, limit = 20) {
    try {
      // Use API proxy route to avoid CORS
      const response = await api.get(`/api/polymarket/events`, {
        params: {
          series_id: seriesId,
          closed: false,
          order: 'end_date_min',
          ascending: true,
          limit
        }
      });
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
