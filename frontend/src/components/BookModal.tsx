import React, { useEffect, useState, type CSSProperties } from 'react';
import '../styles/BookModal.css';

interface SubGenre {
  n: string;
  c: string;
}

interface GenreData {
  label: string;
  icon: string;
  color: string;
  cover: string;
  pageBg: string;
  count: string;
  desc: string;
  sub: SubGenre[];
}

const ICONS: Record<string, React.ReactNode> = {
  romance: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 27S4 20 4 12a6 6 0 0 1 12-1 6 6 0 0 1 12 1c0 8-12 15-12 15z"/></svg>,
  ficcao: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="16" r="5"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8"/></svg>,
  fantasia: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4l2.5 7.5H26l-6.2 4.5 2.4 7.5L16 19l-6.2 4.5 2.4-7.5L6 11.5h7.5z"/></svg>,
  filosofia: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="16" r="10"/><path d="M16 10v6l4 4"/></svg>,
  poesia: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 8h16M8 13h12M8 18h14M8 23h10"/></svg>,
  classica: <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v24M20 4v24M4 8h24M4 24h24M8 4h16M4 28h24"/></svg>
};

const GENRES_DATA: Record<string, GenreData> = {
  romance: {
    label: 'Romance', icon: 'romance', color: '#C05070', cover: '#cb3e3d', pageBg: '#FBF0F4', count: '1.240',
    desc: 'Histórias de amor, relacionamentos e conexões humanas que tocam o coração.',
    sub: [{n: 'Drama romântico', c: '480 livros'}, {n: 'Romance histórico', c: '320 livros'}, {n: 'Chick-lit', c: '210 livros'}, {n: 'Contemporâneo', c: '230 livros'}]
  },
  ficcao: {
    label: 'Ficção Científica', icon: 'ficcao', color: '#2C5A88', cover: '#0f1828ff', pageBg: '#EBF2FA', count: '870',
    desc: 'Universos futuristas, tecnologia e exploração dos limites da imaginação humana.',
    sub: [{n: 'Space opera', c: '280 livros'}, {n: 'Distopia', c: '190 livros'}, {n: 'Cyberpunk', c: '160 livros'}, {n: 'Hard sci-fi', c: '240 livros'}]
  },
  fantasia: {
    label: 'Fantasia', icon: 'fantasia', color: '#534AB7', cover: '#277ab4', pageBg: '#EEEDFE', count: '1.050',
    desc: 'Mundos mágicos, criaturas fantásticas e aventuras épicas além da realidade.',
    sub: [{n: 'Alto fantasia', c: '380 livros'}, {n: 'Fantasia urbana', c: '220 livros'}, {n: 'Magia', c: '180 livros'}, {n: 'Mitologia', c: '270 livros'}]
  },
  filosofia: {
    label: 'Filosofia', icon: 'filosofia', color: '#8A7A60', cover: '#ffab2e', pageBg: '#F5F2EE', count: '540',
    desc: 'Questões fundamentais sobre existência, ética, conhecimento e a condição humana.',
    sub: [{n: 'Filosofia clássica', c: '180 livros'}, {n: 'Estoicismo', c: '120 livros'}, {n: 'Ética e moral', c: '140 livros'}, {n: 'Espiritualidade', c: '100 livros'}]
  },
  poesia: {
    label: 'Poesia', icon: 'poesia', color: '#7A2040', cover: '#3e6745', pageBg: '#FBF0F5', count: '340',
    desc: 'A língua em seu estado mais puro — ritmo, metáfora e emoção destilados em versos.',
    sub: [{n: 'Poesia brasileira', c: '140 livros'}, {n: 'Poesia mundial', c: '110 livros'}, {n: 'Contemporânea', c: '90 livros'}]
  },
  classica: {
    label: 'Literatura Clássica', icon: 'classica', color: '#C8A818', cover: '#c05742', pageBg: '#FFFDF0', count: '790',
    desc: 'Obras imortais que definiram a literatura mundial e continuam a influenciar gerações.',
    sub: [{n: 'Romantismo', c: '210 livros'}, {n: 'Realismo', c: '180 livros'}, {n: 'Modernismo', c: '140 livros'}, {n: 'Tragédia e Épico', c: '110 livros'}]
  }
};

interface BookModalProps {
  genreId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

interface CustomCSSProperties extends CSSProperties {
  '--genre-bg'?: string;
  '--genre-color'?: string;
  '--genre-cover'?: string;
}

export default function BookModal({ genreId, isOpen, onClose }: BookModalProps) {
  const [renderData, setRenderData] = useState<GenreData | null>(null);

  useEffect(() => {
    if (genreId && GENRES_DATA[genreId]) {
      setRenderData(GENRES_DATA[genreId]);
    }
  }, [genreId]);

  if (!renderData && !isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  const dynamicStyles: CustomCSSProperties = renderData ? { 
    '--genre-bg': renderData.pageBg, 
    '--genre-color': renderData.color,
    '--genre-cover': renderData.cover 
  } as CustomCSSProperties : {};

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      {renderData && (
        <div className="open-book" style={dynamicStyles}>
          <button className="modal-close" onClick={onClose}>✕</button>
          
          <div className="page-left">
            <div className="page-left-content">
              <div className="m-icon" style={{ color: renderData.color }}>
                {ICONS[renderData.icon]}
              </div>
              <div className="m-title">{renderData.label}</div>
              <div className="m-desc">{renderData.desc}</div>
              <div className="m-stat">
                <strong>{renderData.count}</strong>
                títulos disponíveis
              </div>
            </div>
            <div className="pnum">— i —</div>
          </div>
          
          <div className="book-spine-modal"></div>
          
          <div className="page-right">
            <div className="pdeco" style={{ width: 150, height: 150, top: -48, right: -48 }}></div>
            <div className="pdeco" style={{ width: 65, height: 65, bottom: 32, right: 14 }}></div>
            
            <div className="page-right-content">
              <div className="sub-label">Escolha um subgênero</div>
              <div className="sub-list">
                {renderData.sub.map((subItem, index) => (
                  <div 
                    key={index} 
                    className="sub-item" 
                    style={{ animationDelay: `${index * 55}ms` } as CSSProperties}
                    onClick={onClose}
                  >
                    <div>
                      <div className="sub-name">{subItem.n}</div>
                      <div className="sub-count">{subItem.c}</div>
                    </div>
                    <div className="sub-arrow" style={{ color: renderData.color }}>→</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pnum">— {renderData.label.toLowerCase()} —</div>
          </div>

        </div>
      )}
    </div>
  );
}
