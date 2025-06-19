import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardCard.css';

const BoardCard = ({ board, onDeleteBoard }) => {
  const navigate = useNavigate();
  const { id, title, description, category, image, createdAt, kudosCount } = board;

  const handleView = () => navigate(`/board/${id}`);
  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteBoard(id);
  };

  return (
    <div className="board-card" onClick={handleView}>
      <div className="board-image-container">
        <img src={image} alt={title} className="board-image" loading="lazy" />
        <div className="board-overlay">
          <span className="board-category">{category}</span>
          <span className="kudos-count">{kudosCount} kudos</span>
        </div>
      </div>

      <div className="board-content">
        <h3 className="board-title">{title}</h3>
        <p className="board-description">{description}</p>
        <div className="board-meta">
          <span className="board-date">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="board-actions">
        <button className="view-board-btn" onClick={(e) => { e.stopPropagation(); handleView(); }}>
          View Board
        </button>
        <button className="delete-board-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
