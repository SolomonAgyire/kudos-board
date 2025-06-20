import React from 'react';
import KudosCard from '../KudosCard/KudosCard';
import './KudosGrid.css';

const KudosGrid = ({
  cards,
  onUpvoteCard,
  onDeleteCard,
  onPinCard,
  emptyMessage = "No cards found. Add your first kudos card!"
}) => {
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

  return (
    <div className="kudos-grid">
      {cards.map((card) => (
        <KudosCard
          key={card.id}
          card={card}
          onUpvote={onUpvoteCard}
          onDelete={onDeleteCard}
          onPin={onPinCard}
        />
      ))}
    </div>
  );
};

export default KudosGrid;
