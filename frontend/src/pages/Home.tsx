import React from 'react';
import { HeroSection, HeroSection02, HeroSection03 } from '../components/HeroSection';
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
      <HeroSection02 onNavigate={handleNavigate} />
      <ExploreSection />
    </div>
  );
};
