import React from 'react';
import HeroSection from '../components/HeroSection';
import ExploreSection from '../components/ExploreSection';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate('/' + page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">
      <HeroSection onNavigate={handleNavigate} />
      <ExploreSection />
    </div>
  );
};
