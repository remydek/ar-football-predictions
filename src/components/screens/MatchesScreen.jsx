import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../shared/Header';
import { Card } from '../shared/Card';
import { Loading } from '../shared/Loading';
import { useLeagueMatches } from '../../hooks/usePolymarket';

export const MatchesScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const league = location.state?.league;

  const { data: matches, isLoading, error } = useLeagueMatches(league);

  return (
    <div className="h-full flex flex-col p-5">
      <Header title="Select Match" showRewards />

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-5">
        {isLoading && <Loading />}

        {error && (
          <div className="text-center p-10 text-white/60">
            <p>Error loading matches</p>
          </div>
        )}

        {!isLoading && !error && matches?.length === 0 && (
          <div className="text-center p-[60px] text-white/40">
            <div className="text-6xl mb-5">📅</div>
            <h3 className="text-xl font-bold mb-2">No Upcoming Matches</h3>
            <p>Check back later for new fixtures</p>
          </div>
        )}

        {matches && matches.length > 0 && (
          <div className="flex flex-col gap-4">
            {matches.map((match) => {
              // TheSportsDB provides timestamp in ISO format
              const date = new Date(match.timestamp || match.date);
              const formattedDate = date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <Card key={match.id}>
                  <div className="text-sm text-white/80 text-center mb-5 capitalize tracking-wide">
                    {formattedDate}
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <div className="flex-1 flex flex-col items-center gap-2.5">
                      <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <img
                          src={match.homeTeamBadge}
                          alt={match.homeTeam}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '⚽';
                            e.target.parentElement.style.fontSize = '24px';
                          }}
                        />
                      </div>
                      <div className="text-sm font-bold text-center text-white">
                        {match.homeTeam}
                      </div>
                    </div>

                    <div className="text-base font-black text-white px-4">VS</div>

                    <div className="flex-1 flex flex-col items-center gap-2.5">
                      <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <img
                          src={match.awayTeamBadge}
                          alt={match.awayTeam}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '⚽';
                            e.target.parentElement.style.fontSize = '24px';
                          }}
                        />
                      </div>
                      <div className="text-sm font-bold text-center text-white">
                        {match.awayTeam}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/prediction', { state: { match } })}
                    className="w-full py-4 bg-white border-none rounded-[50px] text-black text-[15px] font-extrabold cursor-pointer capitalize tracking-wide transition-transform active:scale-[0.98]"
                  >
                    Make Prediction
                  </button>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
