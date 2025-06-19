import React from 'react';
import CommentItem from '../CommentItem/CommentItem';
import './CommentList.css';

const CommentList = ({ comments, loading, onUpdate, onDelete }) => {
  if (loading) {
    return (
      <div className="comment-list">
        <div className="loading-message">Loading comments...</div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="comment-list">
        <div className="no-comments">No comments yet. Be the first to comment!</div>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;
