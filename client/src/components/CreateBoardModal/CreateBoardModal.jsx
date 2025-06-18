import React, { useRef } from 'react';
import { BOARD_CATEGORIES } from '../../constants/boardConstants';
import { useCreateBoard } from '../../hooks/useCreateBoard';
import { formatFileSize } from '../../utils/fileUtils';
import './CreateBoardModal.css';

const CreateBoardModal = ({ isOpen, onClose, onSuccess }) => {
  const fileInputRef = useRef(null);
  const {
    formData,
    errors,
    isSubmitting,
    imagePreview,
    canSubmit,
    handleInputChange,
    handleImageUpload,
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
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleImageUpload(file);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Kudos Board</h2>
          <button
            className="modal-close-btn"
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

          <div className="form-group">
            <label className="form-label">
              Board Image <span className="required">*</span>
            </label>

            <div
              className={`image-upload-area ${errors.image ? 'error' : ''} ${imagePreview ? 'has-image' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleFileInputClick}
            >
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                  <div className="image-info">
                    <p className="image-name">{formData.image?.name}</p>
                    <p className="image-size">{formatFileSize(formData.image?.size || 0)}</p>
                  </div>
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageUpload(null);
                    }}
                    disabled={isSubmitting}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <p className="upload-text">
                    <strong>Click to upload</strong> or drag and drop
                  </p>
                  <p className="upload-hint">
                    PNG, JPG, GIF or WebP (max 5MB)
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-file-input"
              disabled={isSubmitting}
            />

            {errors.image && <span className="error-message">{errors.image}</span>}
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
