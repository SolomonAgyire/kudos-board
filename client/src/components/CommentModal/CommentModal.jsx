import React, { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import CommentList from '../CommentList/CommentList';
import './CommentModal.css';

const CommentModal = ({ isOpen, onClose, card }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { comments, loading, error, addComment, updateComment, deleteComment } = useComments(card?.id);

  if (!isOpen || !card) return null;

  const handleAddComment = async (commentData) => {
    try {
      await addComment(commentData);
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comment-modal-header">
          <h2>Card Details & Comments</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="comment-modal-content">
          <div className="card-details">
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-info">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              {card.author && <p className="card-author">By: {card.author}</p>}
            </div>
          </div>

          <div className="comments-section">
            <div className="comments-header">
              <h3>Comments ({comments.length})</h3>
              <button
                className="add-comment-btn"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? 'Cancel' : 'Add Comment'}
              </button>
            </div>

            {showAddForm && (
              <AddCommentForm
                onSubmit={handleAddComment}
                onCancel={() => setShowAddForm(false)}
              />
            )}

            {error && <div className="error-message">{error}</div>}

            <CommentList
              comments={comments}
              loading={loading}
              onUpdate={updateComment}
              onDelete={deleteComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
