import { useQuery } from '@tanstack/react-query';
import { polymarketAPI } from '../api/polymarket';

export const useLeagueMatches = (league) => {
  return useQuery({
    queryKey: ['matches', league?.series],
    queryFn: async () => {
      if (!league) return [];
      const events = await polymarketAPI.getLeagueEvents(league.series);

      // Filter for upcoming matches
      const now = new Date();
      const upcomingMatches = events
        .filter(event => {
          const endDate = new Date(event.endDate);
          return endDate >= now && event.markets && event.markets.length > 0;
        })
        .map(event => polymarketAPI.parseMatchFromEvent(event))
        .slice(0, 10);

      return upcomingMatches;
    },
    enabled: !!league,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
