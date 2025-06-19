import React, { useState } from 'react';
import './AddCommentForm.css';

const AddCommentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    message: '',
    author: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      setFormData({ message: '', author: '' });
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <form className="add-comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows="3"
          className={errors.message ? 'error' : ''}
        />
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Author (optional)</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Your name"
          maxLength="50"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Add Comment
        </button>
      </div>
    </form>
  );
};

export default AddCommentForm;
