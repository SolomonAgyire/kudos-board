import React, { useEffect, useRef } from 'react';
import { useCreateKudos } from '../../hooks/useCreateKudos';
import GifSearch from '../GifSearch/GifSearch';
import './AddKudosModal.css';

const AddKudosModal = ({ isOpen, onClose, onSuccess, boardId, boardTitle }) => {
  const modalRef = useRef(null);

  const {
    formData,
    errors,
    isSubmitting,
    canSubmit,
    handleInputChange,
    handleGifSelect,
    submitForm,
    resetForm,
    errorMessages
  } = useCreateKudos();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
      resetForm();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, resetForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await submitForm(boardId);
    if (result) {
      onSuccess(result);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="add-kudos-modal"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 className="modal-title">Add New Card</h2>
          <p className="modal-subtitle">to "{boardTitle}"</p>
          <button
            className="modal-close-btn"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="kudos-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Card Title
            </label>
            <input
              type="text"
              id="title"
              className={`form-input ${errors.title ? 'error' : ''}`}
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter a catchy title for your kudos card"
              maxLength={80}
              disabled={isSubmitting}
            />
            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Write your kudos message here..."
              rows={4}
              maxLength={300}
              disabled={isSubmitting}
            />
            <div className="char-count">
              {formData.description.length}/300
            </div>
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="author" className="form-label">
              Author (Optional)
            </label>
            <input
              type="text"
              id="author"
              className={`form-input ${errors.author ? 'error' : ''}`}
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Your name (optional)"
              maxLength={50}
              disabled={isSubmitting}
            />
            {errors.author && (
              <span className="error-message">{errors.author}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Select a GIF
            </label>
            <GifSearch
              onSelect={handleGifSelect}
              selectedGifUrl={formData.image}
            />
            {errors.image && (
              <span className="error-message">{errors.image}</span>
            )}
          </div>

          {errors.general && (
            <div className="general-error">
              {errors.general}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`submit-btn ${canSubmit ? 'enabled' : 'disabled'}`}
              disabled={!canSubmit}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating...
                </>
              ) : (
                'Create Card'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKudosModal;
