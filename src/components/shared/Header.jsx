import { useNavigate } from 'react-router-dom';

export const Header = ({ title, showBack = true, showRewards = false }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8 gap-4">
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-transparent border-none text-3xl cursor-pointer flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            ←
          </button>
        )}
        <h2 className="text-3xl font-black text-black">{title}</h2>
      </div>
      {showRewards && (
        <div className="flex items-center gap-2">
          <button className="bg-black/[0.37] border-none rounded-lg px-3 py-2 text-white text-sm font-bold flex items-center gap-1.5 cursor-pointer">
            🎁 Rewards
          </button>
          <div className="bg-black/[0.37] border-none rounded-lg px-4 py-2 text-white text-sm font-bold flex items-center gap-1.5">
            📊 135
          </div>
        </div>
      )}
    </div>
  );
};
