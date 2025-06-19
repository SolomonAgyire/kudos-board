import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BOARD_CATEGORIES } from '../constants/boardConstants';
import AddKudosModal from '../components/AddKudosModal/AddKudosModal';
import KudosGrid from '../components/KudosGrid/KudosGrid';
import { api } from '../services/api';
import './BoardDetails.css';

const BoardDetails = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoardAndCards = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch board details
        const board = await api.getBoard(boardId);
        setBoard(board);

        // Fetch cards for board
        const cardsData = await api.getKudosCards(boardId);
        setCards(cardsData);
      } catch (err) {
        console.error('Error fetching board details:', err);
        setError(err.message || 'Failed to load board details');
      } finally {
        setLoading(false);
      }
    };

    fetchBoardAndCards();
  }, [boardId]);

  if (loading) {
    return (
      <div className="board-details">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading board details...</p>
        </div>
      </div>
    );
  }

  if (error || !board) {
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

  const handleAddCard = async (newCard) => {
    try {
      const createdCard = await api.createKudosCard(boardId, newCard);
      setCards(prevCards => [...prevCards, createdCard]);
      setIsAddCardModalOpen(false);
    } catch (err) {
      console.error('Error creating card:', err);

    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await api.deleteKudosCard(boardId, cardId);
      setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    } catch (err) {
      console.error('Error deleting card:', err);
    }
  };

  const handleUpvoteCard = async (cardId) => {
    try {
      const updatedCard = await api.upvoteKudosCard(cardId);
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === cardId ? { ...card, upvotes: updatedCard.upvotes } : card
        )
      );
    } catch (err) {
      console.error('Error upvoting card:', err);
    }
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
          onDeleteCard={handleDeleteCard}
          onUpvoteCard={handleUpvoteCard}
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
