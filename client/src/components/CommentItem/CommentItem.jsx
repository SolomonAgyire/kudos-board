import React, { useState } from 'react';
import './CommentItem.css';

const CommentItem = ({ comment, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    message: comment.message,
    author: comment.author || ''
  });
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      message: comment.message,
      author: comment.author || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEdit = () => {
    const newErrors = {};

    if (!editData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateEdit()) return;

    try {
      await onUpdate(comment.id, editData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await onDelete(comment.id);
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <div className="comment-item editing">
        <div className="comment-edit-form">
          <div className="form-group">
            <textarea
              name="message"
              value={editData.message}
              onChange={handleChange}
              rows="3"
              className={errors.message ? 'error' : ''}
            />
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="author"
              value={editData.author}
              onChange={handleChange}
              placeholder="Author (optional)"
              maxLength="50"
            />
          </div>

          <div className="edit-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-meta">
          {comment.author && <span className="comment-author">{comment.author}</span>}
          <span className="comment-date">{formatDate(comment.createdAt)}</span>
        </div>
        <div className="comment-actions">
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="comment-content">
        <p>{comment.message}</p>
      </div>
    </div>
  );
};

export default CommentItem;
