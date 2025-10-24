import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const PredictionScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const match = location.state?.match;

  const [scores, setScores] = useState({ home: 0, away: 0 });

  const adjustScore = (team, delta) => {
    setScores(prev => ({
      ...prev,
      [team]: Math.max(0, Math.min(99, prev[team] + delta))
    }));
  };

  const sharePrediction = () => {
    const text = `My prediction:\n${match.homeTeam} ${scores.home} - ${scores.away} ${match.awayTeam}`;

    if (navigator.share) {
      navigator.share({ title: 'My Match Prediction', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Prediction copied to clipboard!');
      });
    }
  };

  const winner = scores.home > scores.away ? 'home' : scores.away > scores.home ? 'away' : null;

  return (
    <div className="h-full bg-transparent flex flex-col items-center justify-start p-5 pt-10">
      <div className="absolute top-5 left-5 z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/30 text-white border-none text-3xl cursor-pointer flex items-center justify-center"
        >
          ←
        </button>
      </div>

      <div className="mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="145" height="23" viewBox="0 0 145 23" fill="none">
          <path d="M22.614 11.6711H15.3432C15.2553 11.6711 15.2014 11.5732 15.2448 11.4959L18.121 6.35978L15.1464 1.04849H9.19824L6.22359 6.35978L9.09631 11.4899C9.13966 11.5684 9.08577 11.665 8.9979 11.665H3.33329L0.358643 16.9763L3.33329 22.2876H9.28142L12.2561 16.9763L9.38335 11.8462C9.34 11.7677 9.3939 11.6711 9.48176 11.6711H14.9238C14.9648 11.6711 15.0023 11.694 15.0222 11.7303L20.9129 22.1257H28.5376L22.614 11.6711Z" fill="white"/>
          <path d="M42.8602 15.7406V15.6874H42.4173C42.313 15.9387 42.1303 16.2431 41.8702 16.6006C41.6101 16.9594 41.2141 17.2674 40.6845 17.5271C40.155 17.7868 39.438 17.9173 38.5347 17.9173C37.6314 17.9173 36.8148 17.7518 36.0861 17.4208C35.3562 17.0899 34.7786 16.6103 34.3533 15.9834C33.928 15.3565 33.7148 14.587 33.7148 13.6726C33.7148 12.7582 33.9269 12.025 34.3533 11.4162C34.7786 10.8074 35.3644 10.346 36.1119 10.0331C36.8582 9.72025 37.7099 9.56322 38.6647 9.56322H42.3904V8.75752C42.3904 8.05934 42.1818 7.4904 41.7648 7.05192C41.3477 6.61344 40.6963 6.3936 39.8105 6.3936C38.9248 6.3936 38.2863 6.60378 37.8435 7.02535C37.4006 7.44571 37.11 7.98807 36.9706 8.65002L34.2092 7.71025C34.4177 7.01206 34.7516 6.37669 35.2121 5.80292C35.6725 5.23036 36.2841 4.76893 37.0491 4.41983C37.813 4.07074 38.7514 3.89559 39.8633 3.89559C41.548 3.89559 42.8719 4.33044 43.8361 5.19774C44.8003 6.06625 45.2818 7.32491 45.2818 8.97133V17.5682H42.8449L42.859 15.7394L42.8602 15.7406ZM39.0303 15.3915C40.0203 15.3915 40.8275 15.1004 41.4531 14.5182C42.0787 13.9359 42.3915 13.1532 42.3915 12.1675V11.8994H38.8487C38.2055 11.8994 37.6853 12.0431 37.2858 12.3294C36.8863 12.6157 36.6871 13.0372 36.6871 13.5917C36.6871 14.1461 36.8957 14.5629 37.3127 14.895C37.7298 15.2272 38.3027 15.3915 39.0326 15.3915H39.0303Z" fill="white"/>
          <path d="M51.7537 17.7554C50.7637 17.7554 49.8862 17.5271 49.1223 17.0705C48.3584 16.6139 47.7679 15.9689 47.3509 15.1366C46.9338 14.3032 46.7252 13.3332 46.7252 12.2219V4.27126H49.6952V11.9803C49.6952 13.0554 49.9518 13.8514 50.4638 14.3708C50.9757 14.8902 51.7009 15.1499 52.6394 15.1499C53.6985 15.1499 54.5362 14.7924 55.1536 14.0749C55.7699 13.3585 56.078 12.3282 56.078 10.9862V4.27126H59.048V17.5404H56.1295V15.6874H55.6867C55.4606 16.1706 55.0482 16.6369 54.4495 17.0838C53.8508 17.532 52.9522 17.7554 51.7537 17.7554Z" fill="white"/>
          <path d="M60.0567 10.9596V10.5561C60.0567 9.15977 60.3262 7.96391 60.8639 6.96978C61.4017 5.97565 62.1234 5.21465 63.0267 4.68679C63.9299 4.15892 64.9199 3.89438 65.9966 3.89438C67.2127 3.89438 68.1371 4.11785 68.7709 4.56599C69.4047 5.01414 69.8687 5.49731 70.1651 6.01672H70.608V4.27126H73.5264V19.3052C73.5264 20.1822 73.2827 20.8767 72.7965 21.3865C72.3103 21.8962 71.6495 22.1523 70.8165 22.1523H62.1667V19.4659H69.8007C70.3045 19.4659 70.5564 19.1965 70.5564 18.6602V15.5787H70.1136C69.9226 15.8831 69.6613 16.1924 69.3321 16.5052C69.0017 16.8181 68.5682 17.0826 68.0293 17.2976C67.4904 17.5126 66.8132 17.6201 65.9978 17.6201C64.9211 17.6201 63.9311 17.3556 63.0278 16.8277C62.1245 16.2999 61.404 15.5389 60.8651 14.5447C60.3262 13.5506 60.0579 12.356 60.0579 10.9584L60.0567 10.9596ZM66.8308 14.9083C67.9075 14.9083 68.8014 14.5556 69.5137 13.8478C70.226 13.1399 70.5822 12.1506 70.5822 10.8799V10.6117C70.5822 9.32284 70.2307 8.32871 69.5266 7.63052C68.8225 6.93234 67.9239 6.58324 66.8296 6.58324C65.7353 6.58324 64.8531 6.93234 64.1326 7.63052C63.4121 8.32871 63.0512 9.32284 63.0512 10.6117V10.8799C63.0512 12.1518 63.4109 13.1411 64.1326 13.8478C64.8531 14.5556 65.7529 14.9083 66.8308 14.9083Z" fill="white"/>
          <path d="M75.2884 17.5404V4.27126H78.2326V5.74856H78.6755C78.9004 5.30162 79.2789 4.90301 79.8084 4.5527C80.338 4.20361 81.0456 4.02846 81.9313 4.02846C82.8686 4.02846 83.6243 4.22535 84.1983 4.61914C84.7712 5.01293 85.2059 5.51422 85.5011 6.12302H85.9182C86.2135 5.51422 86.6387 5.01293 87.1952 4.61914C87.7506 4.22535 88.5402 4.02846 89.5654 4.02846C90.3644 4.02846 91.0896 4.20724 91.741 4.56599C92.3924 4.92475 92.9137 5.45262 93.3039 6.1508C93.694 6.84899 93.8897 7.71749 93.8897 8.75632V17.5392H90.8939V8.97012C90.8939 8.20067 90.6936 7.61361 90.2953 7.21016C89.8958 6.80671 89.3404 6.60619 88.6281 6.60619C87.8466 6.60619 87.2245 6.87073 86.7653 7.3986C86.3048 7.92647 86.0752 8.68384 86.0752 9.66831V17.538H83.1053V8.96891C83.1053 8.19946 82.9061 7.6124 82.5066 7.20895C82.1071 6.8055 81.5517 6.60499 80.8394 6.60499C80.0404 6.60499 79.4148 6.86952 78.9637 7.39739C78.5115 7.92526 78.2865 8.68263 78.2865 9.6671V17.5368H75.2908L75.2884 17.5404Z" fill="white"/>
          <path d="M101.368 17.9161C100.083 17.9161 98.9486 17.6334 97.968 17.0693C96.9862 16.5052 96.2223 15.7092 95.6752 14.6788C95.128 13.6497 94.855 12.4453 94.855 11.0659V10.7434C94.855 9.347 95.1245 8.13785 95.6623 7.11715C96.2 6.09645 96.9557 5.30404 97.9293 4.73994C98.9017 4.17583 100.022 3.89438 101.291 3.89438C102.559 3.89438 103.635 4.17583 104.573 4.73994C105.512 5.30404 106.241 6.09645 106.762 7.11715C107.283 8.13785 107.543 9.32888 107.543 10.6902V11.7919H97.8777C97.9129 12.8307 98.2691 13.6629 98.9462 14.2899C99.6234 14.9168 100.458 15.2296 101.448 15.2296C102.438 15.2296 103.14 15.0098 103.61 14.5713C104.079 14.1328 104.435 13.6352 104.679 13.0807L107.154 14.3962C106.911 14.8793 106.559 15.3951 106.1 15.9411C105.639 16.4871 105.027 16.9534 104.263 17.3375C103.499 17.7228 102.535 17.9149 101.371 17.9149L101.368 17.9161ZM104.494 9.4545C104.425 8.57754 104.099 7.87936 103.517 7.35994C102.934 6.84053 102.183 6.58083 101.262 6.58083C100.342 6.58083 99.5426 6.84053 98.9697 7.35994C98.3968 7.87936 98.0406 8.57754 97.9012 9.4545H104.494Z" fill="white"/>
          <path d="M108.792 17.5404V4.27126H111.736V6.12423H112.179C112.404 5.62294 112.813 5.14822 113.404 4.70007C113.994 4.25314 114.888 4.02846 116.086 4.02846C117.076 4.02846 117.953 4.26159 118.718 4.72665C119.482 5.19291 120.077 5.83674 120.502 6.66055C120.927 7.48436 121.141 8.46037 121.141 9.58858V17.5392H118.145V9.83017C118.145 8.75632 117.888 7.95425 117.376 7.42638C116.863 6.89851 116.139 6.63398 115.201 6.63398C114.142 6.63398 113.308 6.99636 112.699 7.72233C112.091 8.44709 111.788 9.48108 111.788 10.8243V17.5392L108.792 17.5404Z" fill="white"/>
          <path d="M127.135 17.5404C126.3 17.5404 125.636 17.2855 125.142 16.7746C124.646 16.2636 124.399 15.5703 124.399 14.6933V6.82241H121.532V4.27126H124.399V0H127.395V4.27126H131.094V6.82241H127.395V14.1824C127.395 14.7199 127.637 14.9881 128.125 14.9881H130.703V17.5404H127.135Z" fill="white"/>
          <path d="M137.946 17.9161C136.661 17.9161 135.51 17.6431 134.494 17.0971C133.479 16.5511 132.68 15.772 132.097 14.7598C131.515 13.7487 131.225 12.5347 131.225 11.1202V10.6902C131.225 9.27573 131.515 8.05813 132.097 7.03743C132.68 6.01672 133.479 5.2376 134.494 4.70007C135.51 4.16254 136.661 3.89438 137.946 3.89438C139.231 3.89438 140.377 4.16254 141.384 4.70007C142.392 5.2376 143.186 6.01672 143.769 7.03743C144.35 8.05813 144.642 9.27573 144.642 10.6902V11.1202C144.642 12.5347 144.351 13.7487 143.769 14.7598C143.186 15.772 142.392 16.5511 141.384 17.0971C140.377 17.6431 139.231 17.9161 137.946 17.9161ZM137.946 15.1765C139.04 15.1765 139.934 14.8141 140.629 14.0881C141.324 13.3634 141.67 12.3463 141.67 11.0393V10.7699C141.67 9.46296 141.322 8.44709 140.629 7.72112C139.934 6.99636 139.04 6.63277 137.946 6.63277C136.852 6.63277 135.957 6.99515 135.263 7.72112C134.568 8.44588 134.22 9.46296 134.22 10.7699V11.0393C134.22 12.3463 134.567 13.3622 135.263 14.0881C135.958 14.8129 136.852 15.1765 137.946 15.1765Z" fill="white"/>
        </svg>
      </div>

      <div className="bg-white rounded-[32px] p-9 shadow-2xl max-w-[380px] w-full">
        <div className="text-center mb-8">
          <div className="text-[28px] font-black leading-tight text-black mb-2">
            Pick a winner!
          </div>
          <div className="text-[28px] font-black leading-tight text-black">
            Share your predictions and WIN!
          </div>
        </div>

        <div className="flex gap-2 items-center mb-7">
          <div className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-[20px] bg-gray-100 border-4 transition-all ${winner === 'home' ? 'border-[#00FF8C] bg-[#00FF8C]/5' : 'border-transparent'}`}>
            <div className="w-[90px] h-[90px] flex items-center justify-center mb-2 text-5xl">
              ⚽
            </div>
            <div className="text-sm font-bold text-center text-black uppercase tracking-wide">
              {match.homeTeam}
            </div>
            <div className="bg-white rounded-2xl p-4 min-w-[80px] text-center shadow-sm">
              <div className="text-[52px] font-black leading-none text-black">
                {scores.home}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => adjustScore('home', -1)}
                className="w-10 h-10 rounded-[10px] border-none bg-[#00FF8C] text-black text-xl font-bold cursor-pointer transition-transform active:scale-95"
              >
                −
              </button>
              <button
                onClick={() => adjustScore('home', 1)}
                className="w-10 h-10 rounded-[10px] border-none bg-[#00FF8C] text-black text-xl font-bold cursor-pointer transition-transform active:scale-95"
              >
                +
              </button>
            </div>
            {winner === 'home' && (
              <div className="bg-[#00FF8C] text-black px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest">
                WINNER!
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-1 mx-1">
            <div className="text-base">VS</div>
            <div className="text-2xl leading-[0.5]">:</div>
          </div>

          <div className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-[20px] bg-gray-100 border-4 transition-all ${winner === 'away' ? 'border-[#00FF8C] bg-[#00FF8C]/5' : 'border-transparent'}`}>
            <div className="w-[90px] h-[90px] flex items-center justify-center mb-2 text-5xl">
              ⚽
            </div>
            <div className="text-sm font-bold text-center text-black uppercase tracking-wide">
              {match.awayTeam}
            </div>
            <div className="bg-white rounded-2xl p-4 min-w-[80px] text-center shadow-sm">
              <div className="text-[52px] font-black leading-none text-black">
                {scores.away}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => adjustScore('away', -1)}
                className="w-10 h-10 rounded-[10px] border-none bg-[#00FF8C] text-black text-xl font-bold cursor-pointer transition-transform active:scale-95"
              >
                −
              </button>
              <button
                onClick={() => adjustScore('away', 1)}
                className="w-10 h-10 rounded-[10px] border-none bg-[#00FF8C] text-black text-xl font-bold cursor-pointer transition-transform active:scale-95"
              >
                +
              </button>
            </div>
            {winner === 'away' && (
              <div className="bg-[#00FF8C] text-black px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest">
                WINNER!
              </div>
            )}
          </div>
        </div>

        <button
          onClick={sharePrediction}
          className="w-full py-[18px] bg-[#FF5722] border-none rounded-[50px] text-white text-[15px] font-extrabold uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-[0.98]"
          style={{ boxShadow: '0 4px 12px rgba(255, 87, 34, 0.4)' }}
        >
          📷 VIEW SCORE IN AR
        </button>
      </div>
    </div>
  );
};
