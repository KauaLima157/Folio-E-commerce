import React from "react";

import "../styles/HeroSection.css";


interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {

  return (
    <section className="hero-container">
    
      {/* DECORATIVE ASSETS */}
          <img
        src="/assets/heroSection/bola-fundo-livro.svg"
        alt=""
        className="hero-asset bola-fundo-livro"
      />

      <img
        src="/assets/heroSection/bola-vazia.svg"
        alt=""
        className="hero-asset bola-vazia"
      />

      <img
        src="/assets/heroSection/bola-cheia.svg"
        alt=""
        className="hero-asset bola-cheia"
      />

      <img
        src="/assets/heroSection/triangulo.svg"
        alt=""
        className="hero-asset triangulo"
      />

      <img
        src="/assets/heroSection/plus.svg"
        alt=""
        className="hero-asset plus"
      />

      <img
        src="/assets/heroSection/estrelas.svg"
        alt=""
        className="hero-asset estrelas"
      />

      <img
        src="/assets/heroSection/onda.svg"
        alt=""
        className="hero-asset onda"
      />

      {/* MAIN CONTENT */}
      <main className="hero-main">
        <div className="hero-content">
          <div className="bestsellers-tag">
            <span>
              &mdash; Bestsellers
            </span>
          </div>

          <div className="hero-title-group">
            <h1>
              Encontre seu
              <br />

              <span className="italic-serif">
                Próximo livro
              </span>
            </h1>

            <img
              src="/assets/heroSection/sublinhado.svg"
              alt=""
              className="sublinhado-img"
            />
          </div>

          <p className="hero-subtitle">
            Uma seleção cuidadosa de
            títulos que expandem
            horizontes. Cada página,
            uma nova aventura.
          </p>

          <div className="explore-btn-area">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                onNavigate("explore");
              }}
              className="btn-explore"
            >
              Explorar acervo →
            </a>

            <img
              src="/assets/heroSection/arranhado.svg"
              alt=""
              className="arranhado-img"
            />
          </div>
        </div>

        {/* VISUALS */}
        <div className="hero-visuals">
          <div className="main-book-cover">
            <img
              src="/assets/heroSection/dom-casmurro_500_sem_fundo.png"
              alt="Dom Casmurro"
              className="book-image"
            />
          </div>

          <div className="floating-bubble bubble-left">
            <div className="bubble-content">
              <div className="bubble-book-icon"></div>

              <div className="bubble-text">
                <span className="category">
                  Literatura
                </span>

                <span className="title">
                  Memórias Póstumas
                </span>

                <span className="author">
                  Machado de Assis
                </span>
              </div>
            </div>
          </div>

          <div className="floating-bubble bubble-right">
            <div className="bubble-content">
              <div className="bubble-text">
                <span className="category">
                  Literatura
                </span>

                <span className="title">
                  A Cartomante
                </span>

                <span className="author">
                  Machado de Assis
                </span>
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