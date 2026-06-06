import React from "react";

import "../styles/HeroSection.css";
import "../styles/HeroSection02.css";
import "../styles/HeroSection03.css";

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {

  return (
    <section className="hero-container">
    
      {/* DECORATIVE ASSETS */}
          <img
        src="/assets/heroSection/bola-fundo-livro-branco.svg"
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
              src="/assets/heroSection/morte-de-ivanilitch.svg"
              alt="Ivan Ilitch"
              className="book-image02"
            />
          </div>

          <div className="floating-bubble bubble-left">
            <div className="bubble-content">
              <img
                  src="/assets/heroSection/memorias-postumas.svg"
                  alt="Machado de Assis"
                  className="bubble-book-icon.alt"
                />


              <div className="bubble-text">
                <span className="category">
                  Literatura
                </span>

                <span className="title">
                  Memórias Póstumas
                </span>

                <span className="author">
                  Brás Cubas
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

                <img
                  src="/assets/heroSection/cartomante.svg"
                  alt="Machado de Assis"
                  className="bubble-book-icon.alt"
                />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

{/* HeroSection02 */}
const HeroSection02: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="hero-container02">
       {/* DECORATIVE ASSETS */}
      <img
        src="/assets/heroSection/bola-fundo-livro-marrom.svg"
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
          <div className="bestsellers-tag02">
            <span>
              &mdash; Bestsellers
            </span>
          </div>

          <div className="hero-title-group02">
            <h1>
              Encontre seu
              <br />

              <span className="italic-serif02">
                Próximo livro
              </span>
            </h1>

            <img
              src="/assets/heroSection/sublinhado-amarelo.svg"
              alt=""
              className="sublinhado02-img"
            />
          </div>

          <p className="hero-subtitle02">
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
              src="/assets/heroSection/franz-kafka-metamorfose.svg"
              alt="Franz Kafka"
              className="book-image02"
            />
          </div>

          <div className="floating-bubble bubble-left">
            <div className="bubble-content">
              <img
                  src="/assets/heroSection/memorias-postumas.svg"
                  alt="Machado de Assis"
                  className="bubble-book-icon.alt"
                />


              <div className="bubble-text">
                <span className="category">
                  Literatura
                </span>

                <span className="title">
                  Memórias Póstumas
                </span>

                <span className="author">
                  Brás Cubas
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

                <img
                  src="/assets/heroSection/cartomante.svg"
                  alt="Machado de Assis"
                  className="bubble-book-icon.alt"
                />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

const HeroSection03: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="hero-container03">
       {/* DECORATIVE ASSETS */}
      <img
        src="/assets/heroSection/bola-fundo-livro-azul.svg"
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
              src="/assets/heroSection/dom-casmurro_500_sem_fundo.svg"
              alt="Machado De Assis"
              className="book-image02"
            />
          </div>

          <div className="floating-bubble bubble-left">
            <div className="bubble-content">
              <img
                  src="/assets/heroSection/memorias-postumas.svg"
                  alt="Machado de Assis"
                  className="bubble-book-icon.alt"
                />


              <div className="bubble-text">
                <span className="category">
                  Literatura
                </span>

                <span className="title">
                  Memórias Póstumas
                </span>

                <span className="author">
                  Brás Cubas
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

                <img
                  src="/assets/heroSection/cartomante.svg"
                  alt="Machado de Assis"
                  className="bubble-book-icon.alt"
                />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
export { HeroSection, HeroSection02, HeroSection03 };