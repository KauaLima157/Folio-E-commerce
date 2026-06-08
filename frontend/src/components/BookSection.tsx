import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookSection.css';
import { api, getBookCoverImage } from '../services/api';

const colors = ['#87CEEB', '#D2B48C', '#FFA07A', '#778899', '#FFD700'];

const GenreSection = ({ title, id, offset }: { title: string, id: string, offset: number }) => {
  const navigate = useNavigate();
  const rowRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  
  const [books, setBooks] = useState<any[]>([]);
  
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
          color: colors[(index + offset) % colors.length],
          coverImage: getBookCoverImage(p.title)
        }));
        setBooks(formattedBooks);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };
    
    fetchBooks();
  }, [title, offset]);
  
  const [isDragging, setIsDragging] = useState(false);
  
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = 300;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartXRef.current = e.pageX;
    dragStartYRef.current = e.pageY;

    if (e.pointerType !== 'mouse') return;
    if (e.button !== 0) return;

    isDownRef.current = true;
    startXRef.current = e.pageX - (rowRef.current?.offsetLeft || 0);
    scrollLeftRef.current = rowRef.current?.scrollLeft || 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDownRef.current || !rowRef.current) return;
    if (e.pointerType !== 'mouse') return;

    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;

    if (Math.abs(x - startXRef.current) > 5) {
      setIsDragging(true);
      rowRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  const handlePointerUp = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;

    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  const handlePointerCancel = () => {
    isDownRef.current = false;
    setIsDragging(false);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      isDownRef.current = false;
      setIsDragging(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent, bookId: string) => {
    const distanceX = Math.abs(e.pageX - dragStartXRef.current);
    const distanceY = Math.abs(e.pageY - dragStartYRef.current);

    if (distanceX > 8 || distanceY > 8) {
      e.preventDefault();
      return;
    }
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="genre-section" id={id}>
      <div className="genre-header">
        <h2 className="genre-title">
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
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerMove={handlePointerMove}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {books.map(book => (
          <div 
            key={book.id} 
            className="book-card" 
            onClick={(e) => handleCardClick(e, book.id)}
            style={{ 
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div className={`book-cover ${book.coverImage ? 'has-cover' : ''}`} style={{ background: book.color }}>
              {book.coverImage ? (
                <img src={book.coverImage} alt={book.title} className="book-cover-img" />
              ) : (
                <>
                  <div className="book-cover-spine"></div>
                  <span className="book-cover-title">{book.title}</span>
                </>
              )}
            </div>
            <div className="book-info">
              <span className="book-genre">{book.genre}</span>
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <div className="book-price-row">
                <span className="book-price">{book.price}</span>
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
      <GenreSection title="Literatura" id="genre-classica" offset={0} />
      <GenreSection title="Romance" id="genre-romance" offset={10} />
      <GenreSection title="Poesia" id="genre-poesia" offset={20} />
      <GenreSection title="Fantasia" id="genre-fantasia" offset={30} />
      <GenreSection title="Filosofia" id="genre-filosofia" offset={40} />
      <GenreSection title="Ficção Científica" id="genre-ficcao" offset={50} />
    </div>
  );
};
