import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeScreen } from './components/screens/HomeScreen';
import { SportsScreen } from './components/screens/SportsScreen';
import { LeaguesScreen } from './components/screens/LeaguesScreen';
import { MatchesScreen } from './components/screens/MatchesScreen';
import { PredictionScreen } from './components/screens/PredictionScreen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/sports" element={<SportsScreen />} />
          <Route path="/leagues" element={<LeaguesScreen />} />
          <Route path="/matches/:leagueId" element={<MatchesScreen />} />
          <Route path="/prediction" element={<PredictionScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
