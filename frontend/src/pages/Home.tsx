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
import { CartDrawer } from "../components/CartDrawer";
import { CartBar } from "../components/CartBar";
import { BookSection } from "../components/BookSection";

export const Home: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    if (page === "explore") {
      const targetSelector = isMobile ? ".book-section-container" : ".explore-container";
      const element = document.querySelector(targetSelector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    if (page === "home") navigate("/");
    else navigate("/" + page);

    window.scrollTo(0, 0);
  };

  const handleOpenCart = () => setIsCartOpen(true);

  const heroSections = [
    <div key="hero-3">
      <Header03 onOpenCart={handleOpenCart} />
      <HeroSection03 onNavigate={handleNavigate} />
    </div>,

    <div key="hero-2">
      <Header02 onOpenCart={handleOpenCart} />
      <HeroSection02 onNavigate={handleNavigate} />
    </div>,

    <div key="hero-1">
      <Header onOpenCart={handleOpenCart} />
      <HeroSection onNavigate={handleNavigate} />
    </div>,
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIndex(2);
      return;
    }
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev + 1 >= heroSections.length
          ? 0
          : prev + 1
      );
    }, 6000); // Lenta: 6 seconds instead of 3

    return () => clearInterval(interval);
  }, [isMobile, heroSections.length]);

  return (
    <div className="app-container">
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <CartBar isVisible={!isCartOpen} onOpen={() => setIsCartOpen(true)} />

      <div className="hero-section-wrapper">
        {heroSections[index]}
      </div>

      <div className="slider-dots">
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className={`dot ${index === item ? "active" : ""}`}
            onClick={() => setIndex(item)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>

      <ExploreSection />
      <BookSection />
    </div>
  );
};