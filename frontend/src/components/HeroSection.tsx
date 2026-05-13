import React from 'react';
import '../styles/HeroSection.css';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="hero-container">
      {/* DECORATIVE ASSETS */}
      <img src="/assets/heroSection/bola-fundo-livro.svg" alt="" className="hero-asset bola-fundo-livro" />
      <img src="/assets/heroSection/bola-vazia.svg" alt="" className="hero-asset bola-vazia" />
      <img src="/assets/heroSection/bola-cheia.svg" alt="" className="hero-asset bola-cheia" />
      <img src="/assets/heroSection/triangulo.svg" alt="" className="hero-asset triangulo" />
      <img src="/assets/heroSection/plus.svg" alt="" className="hero-asset plus" />
      <img src="/assets/heroSection/estrelas.svg" alt="" className="hero-asset estrelas" />
      <img src="/assets/heroSection/onda.svg" alt="" className="hero-asset onda" />

      {/* HEADER */}
      <header className="hero-header">
        <div className="header-logo">
          <span className="folio-text">Folio</span>
          <div className="logo-books-icon">
            <svg width="52" height="48" viewBox="0 0 52 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 4L4 14L26 24L48 14L26 4Z" stroke="var(--color-primary)" strokeWidth="4" strokeLinejoin="round" />
              <path d="M4 24L26 34L48 24" stroke="var(--color-primary)" strokeWidth="4" strokeLinejoin="round" />
              <path d="M4 34L26 44L48 34" stroke="var(--color-primary)" strokeWidth="4" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="nav-link-pill active">Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} className="nav-link-pill">Login</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }} className="nav-btn-primary">Criar conta &rarr;</a>
          <div className="cart-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="hero-main">
        <div className="hero-content">
          <div className="bestsellers-tag">
            <span>&mdash; Bestsellers</span>
          </div>

          <div className="hero-title-group">
            <h1>
              Encontre seu<br />
              <span className="italic-serif">Próximo livro</span>
            </h1>
            <img src="/assets/heroSection/sublinhado.svg" alt="" className="sublinhado-img" />
          </div>

          <p className="hero-subtitle">
            Uma seleção cuidadosa de títulos que expandem horizontes. Cada página, uma nova aventura.
          </p>

          <div className="explore-btn-area">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('explore'); }} className="btn-explore">
              Explorar acervo &rarr;
            </a>
            <img src="/assets/heroSection/arranhado.svg" alt="" className="arranhado-img" />
          </div>
        </div>

        {/* VISUALS & FLOATING BOOKS */}
        <div className="hero-visuals">
          <div className="main-book-cover">
            <img src="/assets/heroSection/dom-casmurro_500_sem_fundo.png" alt="Dom Casmurro" className="book-image" />
          </div>

          <div className="floating-bubble bubble-left">
            <div className="bubble-content">
              <div className="bubble-book-icon"></div>
              <div className="bubble-text">
                <span className="category">Literatura</span>
                <span className="title">Memórias Póstumas</span>
                <span className="author">Machado de Assis</span>
              </div>
            </div>
          </div>

          <div className="floating-bubble bubble-right">
            <div className="bubble-content">
              <div className="bubble-text">
                <span className="category">Literatura</span>
                <span className="title">A Cartomante</span>
                <span className="author">Machado de Assis</span>
              </div>
              <div className="bubble-book-icon alt"></div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
