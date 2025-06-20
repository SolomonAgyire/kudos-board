import React, { useState } from 'react';
import { api } from '../../services/api';
import CommentModal from '../CommentModal/CommentModal';
import './KudosCard.css';

const KudosCard = ({ card, onDelete, onUpvote }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);

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
      alert('Failed to upvote card');
    } finally {
      setIsUpvoting(false);
    }
  };

  const handleViewComments = () => {
    setShowCommentModal(true);
  };

  return (
    <>
      <div className="kudos-card">
        <div className="kudos-image-container">
          <img
            src={card.image}
            alt={card.title}
            className="kudos-image"
            loading="lazy"
          />
        </div>

        <div className="kudos-content">
          <h3 className="kudos-title">{card.title}</h3>
          <p className="kudos-description">{card.description}</p>

          <div className="kudos-meta">
            {card.author && (
              <span className="kudos-author">by {card.author}</span>
            )}
            <span className="kudos-date">
              {new Date(card.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="kudos-actions">
          <button
            className="upvote-btn"
            onClick={handleUpvote}
            disabled={isUpvoting}
          >
            <span className="upvote-icon">👍</span>
            <span className="upvote-count">{card.upvotes}</span>
          </button>

          <button
            className="comments-btn"
            onClick={handleViewComments}
          >
            <span className="comments-icon">💬</span>
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : '🗑️'}
          </button>
        </div>
      </div>

      <CommentModal
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        card={card}
      />
    </>
  );
};

export default KudosCard;
