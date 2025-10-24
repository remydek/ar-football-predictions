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
        const apiUrl = `${API_BASE}/events?series_id=${seriesId}&closed=false&limit=${limit}`;
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
    const vsMatch = event.title.match(/(.+)\s+vs\.?\s+(.+)/i);
    let homeTeam = 'Team 1';
    let awayTeam = 'Team 2';

    if (vsMatch) {
      homeTeam = vsMatch[1].trim();
      awayTeam = vsMatch[2].trim();
    }

    // Generate team badge URLs
    const getTeamBadge = (teamName) => {
      // Use badge CDN that supports team names
      const badgeMap = {
        // Premier League 2025/26
        'Leeds United': 'https://crests.football-data.org/341.png',
        'Leeds': 'https://crests.football-data.org/341.png',
        'West Ham': 'https://crests.football-data.org/563.png',
        'West Ham United': 'https://crests.football-data.org/563.png',
        'Chelsea': 'https://crests.football-data.org/61.png',
        'Sunderland': 'https://crests.football-data.org/396.png',
        'Sunderland AFC': 'https://crests.football-data.org/396.png',
        'Manchester United': 'https://crests.football-data.org/66.png',
        'Man Utd': 'https://crests.football-data.org/66.png',
        'Manchester City': 'https://crests.football-data.org/65.png',
        'Man City': 'https://crests.football-data.org/65.png',
        'Liverpool': 'https://crests.football-data.org/64.png',
        'Arsenal': 'https://crests.football-data.org/57.png',
        'Tottenham': 'https://crests.football-data.org/73.png',
        'Tottenham Hotspur': 'https://crests.football-data.org/73.png',
        'Spurs': 'https://crests.football-data.org/73.png',
        'Newcastle': 'https://crests.football-data.org/67.png',
        'Newcastle United': 'https://crests.football-data.org/67.png',
        'Brighton': 'https://crests.football-data.org/397.png',
        'Brighton & Hove Albion': 'https://crests.football-data.org/397.png',
        'Aston Villa': 'https://crests.football-data.org/58.png',
        'Everton': 'https://crests.football-data.org/62.png',
        'Fulham': 'https://crests.football-data.org/63.png',
        'Crystal Palace': 'https://crests.football-data.org/354.png',
        'Brentford': 'https://crests.football-data.org/402.png',
        'Nottingham Forest': 'https://crests.football-data.org/351.png',
        'Nottingham': 'https://crests.football-data.org/351.png',
        'Wolverhampton': 'https://crests.football-data.org/76.png',
        'Wolves': 'https://crests.football-data.org/76.png',
        'Southampton': 'https://crests.football-data.org/340.png',
        'Leicester': 'https://crests.football-data.org/338.png',
        'Leicester City': 'https://crests.football-data.org/338.png',
        'Ipswich': 'https://crests.football-data.org/349.png',
        'Ipswich Town': 'https://crests.football-data.org/349.png',
        'Bournemouth': 'https://crests.football-data.org/1044.png',
        'AFC Bournemouth': 'https://crests.football-data.org/1044.png',
        // Dutch Eredivisie
        'Feyenoord': 'https://crests.football-data.org/670.png',
        'Feyenoord Rotterdam': 'https://crests.football-data.org/670.png',
        'PSV': 'https://crests.football-data.org/674.png',
        'PSV Eindhoven': 'https://crests.football-data.org/674.png',
        'Ajax': 'https://crests.football-data.org/678.png',
        'AFC Ajax': 'https://crests.football-data.org/678.png',
      };

      return badgeMap[teamName] || `https://via.placeholder.com/70x70/cccccc/666666?text=${encodeURIComponent(teamName.substring(0, 3))}`;
    };

    return {
      id: event.id,
      homeTeam,
      awayTeam,
      homeTeamBadge: getTeamBadge(homeTeam),
      awayTeamBadge: getTeamBadge(awayTeam),
      date: event.endDate,
      markets: event.markets || [],
      image: event.image,
      slug: event.slug,
    };
  }
};
