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

    // Generate team badge URLs using TheSportsDB
    const getTeamBadge = (teamName) => {
      // Map common team name variations to their proper names
      const teamMap = {
        'Leeds United': 'Leeds',
        'West Ham': 'West_Ham',
        'Chelsea': 'Chelsea',
        'Sunderland AFC': 'Sunderland',
        'Manchester United': 'Man_Utd',
        'Manchester City': 'Man_City',
        'Liverpool': 'Liverpool',
        'Arsenal': 'Arsenal',
        'Tottenham': 'Tottenham',
        'Newcastle United': 'Newcastle',
        'Brighton': 'Brighton',
        'Aston Villa': 'Aston_Villa',
        'Everton': 'Everton',
        'Fulham': 'Fulham',
        'Crystal Palace': 'Crystal_Palace',
        'Brentford': 'Brentford',
        'Nottingham Forest': 'Nottingham',
        'Wolverhampton': 'Wolves',
        'Southampton': 'Southampton',
        'Leicester City': 'Leicester',
        'Ipswich Town': 'Ipswich',
        'Bournemouth': 'Bournemouth',
      };

      const mappedName = teamMap[teamName] || teamName.replace(/\s+/g, '_');
      return `https://resources.premierleague.com/premierleague/badges/70/t${this.getTeamId(teamName)}.png`;
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
  },

  // Get Premier League team IDs
  getTeamId(teamName) {
    const teamIds = {
      'Leeds': '7',
      'Leeds United': '7',
      'West Ham': '21',
      'Chelsea': '4',
      'Sunderland': '56',
      'Sunderland AFC': '56',
      'Manchester United': '1',
      'Man Utd': '1',
      'Manchester City': '43',
      'Man City': '43',
      'Liverpool': '10',
      'Arsenal': '3',
      'Tottenham': '6',
      'Tottenham Hotspur': '6',
      'Newcastle': '23',
      'Newcastle United': '23',
      'Brighton': '131',
      'Aston Villa': '7',
      'Everton': '11',
      'Fulham': '54',
      'Crystal Palace': '31',
      'Brentford': '94',
      'Nottingham Forest': '17',
      'Nottingham': '17',
      'Wolverhampton': '39',
      'Wolves': '39',
      'Southampton': '20',
      'Leicester': '13',
      'Leicester City': '13',
      'Ipswich': '40',
      'Ipswich Town': '40',
      'Bournemouth': '91',
    };

    return teamIds[teamName] || '1';
  }
};
