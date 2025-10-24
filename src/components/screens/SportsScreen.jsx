import { useNavigate } from 'react-router-dom';
import { Header } from '../shared/Header';
import { Card } from '../shared/Card';

export const SportsScreen = () => {
  const navigate = useNavigate();

  const sports = [
    { id: 'football', name: 'Football', icon: '⚽', enabled: true },
    { id: 'basketball', name: 'Basketball', icon: '🏀', enabled: false },
    { id: 'american-football', name: 'American Football', icon: '🏈', enabled: false },
    { id: 'baseball', name: 'Baseball', icon: '⚾', enabled: false },
    { id: 'hockey', name: 'Hockey', icon: '🏒', enabled: false },
    { id: 'cricket', name: 'Cricket', icon: '🏏', enabled: false },
  ];

  return (
    <div className="h-full flex flex-col p-5">
      <Header title="Select Sport" showRewards />

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-5">
        <div className="grid grid-cols-1 gap-4">
          {sports.map((sport) => (
            <Card
              key={sport.id}
              onClick={() => sport.enabled && navigate('/leagues')}
              className={!sport.enabled ? 'opacity-70 cursor-not-allowed' : ''}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 text-3xl flex items-center justify-center">
                    {sport.icon}
                  </div>
                  <div className="text-base font-bold text-white">{sport.name}</div>
                </div>
                {sport.enabled ? (
                  <div className="bg-white/25 border-none px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider text-white">
                    REWARDS
                  </div>
                ) : (
                  <div className="bg-transparent border-2 border-white/60 px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider text-white">
                    COMING SOON
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
