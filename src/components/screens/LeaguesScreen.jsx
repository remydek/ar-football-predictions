import { useNavigate } from 'react-router-dom';
import { Header } from '../shared/Header';
import { Card } from '../shared/Card';
import { FOOTBALL_LEAGUES } from '../../utils/leagues';

export const LeaguesScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col p-5">
      <Header title="Select League" showRewards />

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-5">
        <div className="grid grid-cols-1 gap-4">
          {FOOTBALL_LEAGUES.map((league) => (
            <Card
              key={league.sport}
              onClick={() => navigate(`/matches/${league.sport}`, { state: { league } })}
            >
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-lg text-[32px] flex items-center justify-center">
                  {league.icon}
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-white mb-1">{league.name}</div>
                  <div className="text-sm text-white/70">{league.country}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
