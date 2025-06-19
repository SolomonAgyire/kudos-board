import React from 'react';
import './KudosCard.css';

const KudosCard = ({ card, onUpvote, onDelete }) => {
  const { id, title, description, author, image, upvotes, createdAt } = card;

  const handleUpvote = (e) => {
    e.stopPropagation();
    onUpvote(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete(id);
    }
  };

  return (
    <div className="kudos-card">
      <div className="kudos-image-container">
        <img
          src={image}
          alt={title}
          className="kudos-image"
          loading="lazy"
        />
      </div>

      <div className="kudos-content">
        <h3 className="kudos-title">{title}</h3>
        <p className="kudos-description">{description}</p>

        <div className="kudos-meta">
          {author && (
            <span className="kudos-author">by {author}</span>
          )}
          <span className="kudos-date">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="kudos-actions">
        <button
          className="upvote-btn"
          onClick={handleUpvote}
          title="Upvote this card"
        >
          <span className="upvote-icon">👍</span>
          <span className="upvote-count">{upvotes}</span>
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
          title="Delete this card"
        >
          <span className="delete-icon">🗑️</span>
        </button>
      </div>
    </div>
  );
};

export default KudosCard;
