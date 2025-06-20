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
    // Don't clear selectedCard immediately to avoid unmounting issues
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

  // Sort cards: pinned cards first (sorted by pinnedAt), then unpinned cards
  const sortedCards = [...cards].sort((a, b) => {
    // If both cards are pinned or both are unpinned, sort by pinnedAt or createdAt
    if (a.isPinned === b.isPinned) {
      if (a.isPinned) {
        // For pinned cards, sort by pinnedAt (most recent first)
        return new Date(b.pinnedAt) - new Date(a.pinnedAt);
      } else {
        // For unpinned cards, sort by createdAt (most recent first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    }
    // If one is pinned and the other is not, pinned comes first
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

      {/* Single CommentModal instance for the entire grid */}
      {selectedCard && (
        <CommentModal isOpen={showCommentModal} onClose={handleCloseComments} card={selectedCard} />
      )}
    </div>
  );
};

export default KudosGrid;
