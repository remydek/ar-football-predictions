import { useQuery } from '@tanstack/react-query';
import { sportsDbAPI } from '../api/thesportsdb';

export const useLeagueMatches = (league) => {
  return useQuery({
    queryKey: ['matches', league?.leagueId],
    queryFn: async () => {
      if (!league) return [];

      console.log('[HOOK] Fetching matches for league:', league);
      const events = await sportsDbAPI.getNextLeagueEvents(league.leagueId);

      // Filter for upcoming and "Not Started" matches only
      const now = new Date();
      const upcomingMatches = events
        .filter(event => {
          const eventDate = new Date(event.dateEvent);
          // Only show matches that haven't started yet
          return eventDate >= now && event.strStatus === 'Not Started';
        })
        .map(event => sportsDbAPI.parseMatchFromEvent(event))
        .slice(0, 15); // Show top 15 upcoming matches

      console.log('[HOOK] Filtered matches:', upcomingMatches.length);
      return upcomingMatches;
    },
    enabled: !!league,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
