import { useState, useCallback, useEffect, useMemo } from 'react';
import { DEFAULT_FORM_VALUES } from '../constants/boardConstants';
import { validateField, validateForm, isFormValid } from '../utils/validation';
import { createPreviewURL, revokePreviewURL } from '../utils/fileUtils';
import { createBoard } from '../services/boardService';

export const useCreateBoard = () => {
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const handleInputChange = useCallback((fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, []);
  const handleImageUpload = useCallback((file) => {
    if (!file) {
      setFormData(prev => ({ ...prev, image: null }));
      setImagePreview(null);
      setErrors(prev => ({ ...prev, image: null }));
      return;
    }
    const error = validateField('image', file);
    setErrors(prev => ({ ...prev, image: error }));
    if (!error) {
      setFormData(prev => ({ ...prev, image: file }));
      const previewUrl = createPreviewURL(file);
      setImagePreview(previewUrl);
    }
  }, []);
  const handleSubmit = useCallback(async (onSuccess) => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    if (!isFormValid(formErrors)) {
      return;
    }
    setIsSubmitting(true);
    try {
      const newBoard = await createBoard(formData);
      setFormData(DEFAULT_FORM_VALUES);
      setErrors({});
      setImagePreview(null);
      if (onSuccess) {
        onSuccess(newBoard);
      }
      return newBoard;
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);
  const resetForm = useCallback(() => {
    setFormData(DEFAULT_FORM_VALUES);
    setErrors({});
    setImagePreview(null);
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        revokePreviewURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const canSubmit = useMemo(() => {
    const hasRequiredFields =
      formData.title.trim() &&
      formData.description.trim() &&
      formData.category &&
      formData.image;
    const hasNoErrors = Object.values(errors).every(error => !error);
    return hasRequiredFields && hasNoErrors && !isSubmitting;
  }, [formData, errors, isSubmitting]);

  return {
    formData,
    errors,
    isSubmitting,
    imagePreview,
    canSubmit,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    resetForm
  };
};
