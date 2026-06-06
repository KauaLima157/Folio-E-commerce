import React, { useState } from 'react';
import '../styles/ExploreSection.css';
import LivrosEGato from './LivrosEGato.tsx';
import BookModal from './BookModal';

const ExploreSection: React.FC = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (genreId: string) => {
    setSelectedGenreId(genreId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="explore-container">
      <div className="explore-text-explorar">— Explorar</div>
      <div className="explore-text-navegue">Navegue por gênero</div>
      <div className="explore-text-clique">
        Clique em qualquer livro para descobrir os subgêneros e encontrar exatamente o que você está buscando.
      </div>
      
      <div className="explore-livros-gato" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <LivrosEGato onBookClick={handleBookClick} />
      </div>

      <BookModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        genreId={selectedGenreId} 
      />
    </div>
  );
};

export default ExploreSection;
