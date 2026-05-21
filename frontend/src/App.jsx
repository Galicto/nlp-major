import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoadingScreen from './pages/LoadingScreen';
import Dashboard from './pages/Dashboard';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'loading', 'dashboard'

  const handleEnter = () => {
    setView('loading');
  };

  const handleLoaded = () => {
    setView('dashboard');
  };

  return (
    <>
      {view === 'landing' && <LandingPage onEnter={handleEnter} />}
      {view === 'loading' && <LoadingScreen onComplete={handleLoaded} />}
      {view === 'dashboard' && <Dashboard />}
    </>
  );
}

export default App;
