import React, { useState } from 'react';
import KudosCard from '../KudosCard/KudosCard';
import CommentModal from '../CommentModal/CommentModal';
import './KudosGrid.css';

const KudosGrid = ({
  cards,
  onUpvoteCard,
  onDeleteCard,
  onPinCard,
  emptyMessage = 'No cards found. Add your first kudos card!',
}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const handleOpenComments = (card) => {
    setSelectedCard(card);
    setShowCommentModal(true);
  };

  const handleCloseComments = () => {
    setShowCommentModal(false);
    setTimeout(() => setSelectedCard(null), 300);
  };
  if (cards.length === 0) {
    return (
      <div className="kudos-grid-empty">
        <div className="empty-state">
          <div className="empty-icon">🎉</div>
          <h3 className="empty-title">No Cards Yet</h3>
          <p className="empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const sortedCards = [...cards].sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      if (a.isPinned) {
        return new Date(b.pinnedAt) - new Date(a.pinnedAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    }
    return a.isPinned ? -1 : 1;
  });

  return (
    <div className="kudos-grid">
      {sortedCards.map((card) => (
        <KudosCard
          key={card.id}
          card={card}
          onUpvote={onUpvoteCard}
          onDelete={onDeleteCard}
          onPin={onPinCard}
          onOpenComments={handleOpenComments}
        />
      ))}

      {selectedCard && (
        <CommentModal isOpen={showCommentModal} onClose={handleCloseComments} card={selectedCard} />
      )}
    </div>
  );
};

export default KudosGrid;
