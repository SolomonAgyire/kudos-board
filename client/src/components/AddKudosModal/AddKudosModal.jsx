import React, { useEffect, useRef, useState } from 'react';
import { useCreateKudos } from '../../hooks/useCreateKudos';
import { formatFileSize } from '../../utils/fileUtils';
import './AddKudosModal.css';

const AddKudosModal = ({ isOpen, onClose, onSuccess, boardId, boardTitle }) => {
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const {
    formData,
    errors,
    isSubmitting,
    previewUrl,
    canSubmit,
    handleInputChange,
    handleImageChange,
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      handleImageChange(imageFile);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    handleImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
              Card Title *
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
              Description *
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
              Image/GIF *
            </label>
            <div
              className={`image-upload-area ${isDragOver ? 'drag-over' : ''} ${errors.image ? 'error' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" className="preview-image" />
                  <div className="image-overlay">
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  {formData.image && (
                    <div className="file-info">
                      <span className="file-name">{formData.image.name}</span>
                      <span className="file-size">{formatFileSize(formData.image.size)}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📁</div>
                  <p className="upload-text">
                    Drag & drop an image here, or click to select
                  </p>
                  <p className="upload-hint">
                    Supports: JPEG, PNG, GIF, WebP (max 5MB)
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden-file-input"
              disabled={isSubmitting}
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
