import React from "react";
import { useEffect, useState } from "react";
import "../styles/home.css";

import {
  HeroSection,
  HeroSection02,
  HeroSection03,
} from "../components/HeroSection";

import {
  Header,
  Header02,
  Header03,
} from "../pages/Header";

import ExploreSection from "../components/ExploreSection";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    if (page === "home") navigate("/");
    else navigate("/" + page);

    window.scrollTo(0, 0);
  };

  const heroSections = [
    <>
      <Header03 />
      <HeroSection03 onNavigate={handleNavigate} />
    </>,

    <>
      <Header02 />
      <HeroSection02 onNavigate={handleNavigate} />
    </>,

    <>
      <Header />
      <HeroSection onNavigate={handleNavigate} />
    </>,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev + 1 >= heroSections.length
          ? 0
          : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">

      {heroSections[index]}

      <div className="slider-dots">
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className={`dot ${index === item ? "active" : ""}`}
          />
        ))}
      </div>

      <ExploreSection />
    </div>
  );
};