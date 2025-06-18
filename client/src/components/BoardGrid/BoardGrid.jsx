import React from 'react';
import BoardCard from '../BoardCard/BoardCard';
import './BoardGrid.css';

const BoardGrid = ({
  boards,
  onDeleteBoard,
  emptyMessage = "No boards found. Create your first board!"
}) => {
  if (boards.length === 0) {
    return (
      <div className="boards-grid-empty">
        <div className="empty-state">
          <h3 className="empty-title">No Boards Yet</h3>
          <p className="empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="boards-grid">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onDeleteBoard={onDeleteBoard}
        />
      ))}
    </div>
  );
};

export default BoardGrid;
