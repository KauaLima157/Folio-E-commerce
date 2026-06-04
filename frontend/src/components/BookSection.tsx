import React, { useRef, useState, useEffect } from 'react';
import '../styles/BookSection.css';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

const colors = ['#87CEEB', '#D2B48C', '#FFA07A', '#778899', '#FFD700'];

const GenreSection = ({ title, offset }: { title: string, offset: number }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [books, setBooks] = useState<any[]>([]);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedProducts = await api.getProducts(title);
        const formattedBooks = fetchedProducts.map((p, index) => ({
          id: p.id,
          title: p.title,
          author: p.authors[0] || 'Autor Desconhecido',
          price: `R$ ${Number(p.price).toFixed(2).replace('.', ',')}`,
          rawPrice: Number(p.price),
          genre: title.toUpperCase(),
          color: colors[(index + offset) % colors.length]
        }));
        setBooks(formattedBooks);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };
    
    fetchBooks();
  }, [title, offset]);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = 300;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (rowRef.current?.offsetLeft || 0));
    setScrollLeft(rowRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !rowRef.current) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="genre-section">
      <div className="genre-header">
        <h2 className="genre-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--terracotta)" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          {title}
        </h2>
        <div className="genre-arrows">
          <button className="arrow-btn" onClick={() => scroll('left')}>←</button>
          <button className="arrow-btn" onClick={() => scroll('right')}>→</button>
        </div>
      </div>
      <div 
        className="books-row" 
        ref={rowRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {books.map(book => (
          <div key={book.id} className="book-card" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
            <div className="book-cover" style={{ background: book.color }}>
              <span className="book-cover-title">{book.title}</span>
            </div>
            <div className="book-info">
              <span className="book-genre">{book.genre}</span>
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <div className="book-price-row">
                <span className="book-price">{book.price}</span>
                <button 
                  className="book-add-btn" 
                  onClick={() => addToCart({ id: book.id, title: book.title, price: book.rawPrice })}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BookSection: React.FC = () => {
  return (
    <div className="book-section-container">
      <GenreSection title="Literatura" offset={0} />
      <GenreSection title="Romance" offset={10} />
      <GenreSection title="Poesia" offset={20} />
      <GenreSection title="Fantasia" offset={30} />
      <GenreSection title="Filosofia" offset={40} />
      <GenreSection title="Ficção Científica" offset={50} />
    </div>
  );
};
