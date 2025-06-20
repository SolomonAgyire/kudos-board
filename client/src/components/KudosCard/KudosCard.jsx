import React, { useState } from 'react';
import './KudosCard.css';

const KudosCard = ({ card, onDelete, onUpvote, onPin, onOpenComments }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [isPinning, setIsPinning] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      setIsDeleting(true);
      try {
        await onDelete(card.id);
      } catch (error) {
        console.error('Failed to delete card:', error);
        alert('Failed to delete card: ' + error.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleUpvote = async () => {
    setIsUpvoting(true);
    try {
      await onUpvote(card.id);
    } catch (error) {
      console.error('Failed to upvote card:', error);
      alert('Failed to upvote card: ' + error.message);
    } finally {
      setIsUpvoting(false);
    }
  };

  const handlePin = async () => {
    setIsPinning(true);
    try {
      await onPin(card.id);
    } catch (error) {
      console.error('Failed to pin card:', error);
      alert('Failed to pin card: ' + error.message);
    } finally {
      setIsPinning(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // We now use onOpenComments prop instead of local state

  return (
    <div className={`kudos-card ${card.isPinned ? 'pinned' : ''}`}>
      {card.isPinned && <div className="pin-indicator">📌</div>}

      <div className="kudos-image-container">
        <img src={card.image} alt={card.title} className="kudos-image" />
      </div>

      <div className="kudos-content">
        <h3 className="kudos-title">{card.title}</h3>
        <p className="kudos-description">{card.description}</p>

        <div className="kudos-meta">
          {card.author && <span className="kudos-author">by {card.author}</span>}
          <span className="kudos-date">{formatDate(card.createdAt)}</span>
        </div>

        <div className="kudos-actions">
          <button className="upvote-btn" onClick={handleUpvote} disabled={isUpvoting}>
            <span className="upvote-icon">👍</span>
            <span className="upvote-count">{card.upvotes}</span>
          </button>

          <button className="pin-btn" onClick={handlePin} disabled={isPinning}>
            <span className="pin-icon">{card.isPinned ? '📌' : '📍'}</span>
            <span>{card.isPinned ? 'Unpin' : 'Pin'}</span>
          </button>

          <button className="comments-btn" onClick={() => onOpenComments(card)}>
            <span className="comments-icon">💬</span>
            <span>Comments</span>
          </button>

          <button className="delete-btn" onClick={handleDelete} disabled={isDeleting}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default KudosCard;
