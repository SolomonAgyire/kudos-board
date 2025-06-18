import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_BOARDS, MOCK_CARDS, BOARD_CATEGORIES } from '../constants/boardConstants';
import AddKudosModal from '../components/AddKudosModal/AddKudosModal';
import KudosGrid from '../components/KudosGrid/KudosGrid';
import './BoardDetails.css';

const BoardDetails = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [cards, setCards] = useState(MOCK_CARDS[boardId] || []);

  const board = MOCK_BOARDS.find(b => b.id === parseInt(boardId));

  if (!board) {
    return (
      <div className="board-details">
        <div className="error-container">
          <h2>Board Not Found</h2>
          <p>The board you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const categoryData = BOARD_CATEGORIES.find(cat => cat.value === board.category);
  const categoryColor = categoryData ? categoryData.color : '#667eea';

  const handleAddCard = (newCard) => {
    setCards(prevCards => [...prevCards, newCard]);
    setIsAddCardModalOpen(false);
  };

  const handleUpvoteCard = (cardId) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? { ...card, upvotes: card.upvotes + 1 }
          : card
      )
    );
  };

  const handleDeleteCard = (cardId) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/');
  };

  const handleAddCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddCardModalOpen(true);
  };

  return (
    <div className="board-details" style={{ '--category-color': categoryColor }}>
      <div className="board-header">
        <button
          type="button"
          onClick={handleBackClick}
          className="back-button"
        >
          ← Back to Dashboard
        </button>

        <div className="board-info">
          <h1 className="board-title">{board.title}</h1>
          <p className="board-description">{board.description}</p>
          <div className="board-meta">
            <span className="board-category-badge">{categoryData?.label}</span>
            <span className="board-stats">{cards.length} cards</span>
            {board.author && <span className="board-author">by {board.author}</span>}
          </div>
        </div>
      </div>

      <div className="board-actions">
        <button
          type="button"
          className="add-card-btn"
          onClick={handleAddCardClick}
        >
          + Add New Card
        </button>
      </div>

      <main className="board-main">
        <KudosGrid
          cards={cards}
          onUpvoteCard={handleUpvoteCard}
          onDeleteCard={handleDeleteCard}
          emptyMessage="No cards yet. Be the first to add a kudos card!"
        />
      </main>

      <AddKudosModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onSuccess={handleAddCard}
        boardId={boardId}
        boardTitle={board.title}
      />
    </div>
  );
};

export default BoardDetails;
