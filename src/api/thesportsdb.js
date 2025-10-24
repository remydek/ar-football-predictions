import axios from 'axios';

const API_KEY = '248104';
const API_BASE = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

// Create axios instance
const api = axios.create({
  timeout: 30000,
});

export const sportsDbAPI = {
  // Fetch next events for a specific league
  async getNextLeagueEvents(leagueId) {
    try {
      console.log('[SPORTSDB] Fetching next events for league:', leagueId);
      const response = await api.get(`${API_BASE}/eventsnextleague.php?id=${leagueId}`);
      console.log('[SPORTSDB] Response:', {
        status: response.status,
        eventsCount: response.data?.events?.length || 0
      });
      return response.data.events || [];
    } catch (error) {
      console.error('[SPORTSDB] Error fetching events:', error);
      throw error;
    }
  },

  // Fetch full season schedule
  async getSeasonEvents(leagueId, season) {
    try {
      console.log('[SPORTSDB] Fetching season events:', { leagueId, season });
      const response = await api.get(`${API_BASE}/eventsseason.php?id=${leagueId}&s=${season}`);
      console.log('[SPORTSDB] Response:', {
        status: response.status,
        eventsCount: response.data?.events?.length || 0
      });
      return response.data.events || [];
    } catch (error) {
      console.error('[SPORTSDB] Error fetching season events:', error);
      throw error;
    }
  },

  // Parse match data from TheSportsDB event
  parseMatchFromEvent(event) {
    return {
      id: event.idEvent,
      homeTeam: event.strHomeTeam,
      awayTeam: event.strAwayTeam,
      homeTeamBadge: event.strHomeTeamBadge,
      awayTeamBadge: event.strAwayTeamBadge,
      date: event.dateEvent,
      time: event.strTime,
      timestamp: event.strTimestamp,
      venue: event.strVenue,
      round: event.intRound,
      status: event.strStatus,
      homeScore: event.intHomeScore,
      awayScore: event.intAwayScore,
      league: event.strLeague,
      leagueBadge: event.strLeagueBadge,
      season: event.strSeason,
      poster: event.strPoster,
      thumb: event.strThumb,
    };
  }
};
