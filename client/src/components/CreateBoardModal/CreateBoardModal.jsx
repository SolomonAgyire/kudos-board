import React from 'react';
import { BOARD_CATEGORIES } from '../../constants/boardConstants';
import { useCreateBoard } from '../../hooks/useCreateBoard';
import './CreateBoardModal.css';

const CreateBoardModal = ({ isOpen, onClose, onSuccess }) => {
  const {
    formData,
    errors,
    isSubmitting,
    canSubmit,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useCreateBoard();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit((newBoard) => {
        onSuccess?.(newBoard);
        handleClose();
      });
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="create-board-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Kudos Board</h2>
          <button
            className="close-btn"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form className="create-board-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Board Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              className={`form-input ${errors.title ? 'error' : ''}`}
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter board title..."
              disabled={isSubmitting}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your kudos board..."
              rows={4}
              disabled={isSubmitting}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              className={`form-select ${errors.category ? 'error' : ''}`}
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              disabled={isSubmitting}
            >
              <option value="">Select a category...</option>
              {BOARD_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author" className="form-label">
              Author <span className="optional">(optional)</span>
            </label>
            <input
              type="text"
              id="author"
              className={`form-input ${errors.author ? 'error' : ''}`}
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Your name..."
              disabled={isSubmitting}
            />
            {errors.author && <span className="error-message">{errors.author}</span>}
          </div>

          {errors.submit && (
            <div className="form-error">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : (
                'Create Board'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
