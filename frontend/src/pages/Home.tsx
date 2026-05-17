import React from 'react';
import { useEffect, useState } from "react";
import { HeroSection, HeroSection02, HeroSection03 } from '../components/HeroSection';
import ExploreSection from '../components/ExploreSection';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    if (page === 'home') navigate('/');

    else navigate('/' + page);

    window.scrollTo(0, 0);
  };

    const heroArray = [<HeroSection03 onNavigate={handleNavigate}/>, <HeroSection onNavigate={handleNavigate}/>, <HeroSection02 onNavigate={handleNavigate}/>];
  
    useEffect(() => {
  
       const interval = setInterval(() => {
  
        setIndex((prev) =>
          prev + 1 >= heroArray.length
            ? 0
            : prev + 1
        );
  
      }, 3000);
  
      return () => clearInterval(interval);
  
    }, []);

  return (
    <div className="app-container">
      {heroArray[index]}
      <ExploreSection />
    </div>
  );
};
