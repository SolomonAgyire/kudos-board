import { useState, useMemo, useCallback } from 'react';
import {
  DEFAULT_CARD_VALUES,
  CARD_VALIDATION_RULES,
  CARD_ERROR_MESSAGES
} from '../constants/boardConstants';
import { validateField, isFormValid } from '../utils/validation';
import { createPreviewURL, revokePreviewURL } from '../utils/fileUtils';

export const useCreateKudos = () => {
  const [formData, setFormData] = useState(DEFAULT_CARD_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      const fieldError = validateField(field, value, CARD_VALIDATION_RULES);
      setErrors(prev => ({
        ...prev,
        [field]: fieldError
      }));
    }
  };

  const handleImageChange = (file) => {
    if (previewUrl) {
      revokePreviewURL(previewUrl);
    }

    if (file) {
      const newPreviewUrl = createPreviewURL(file);
      setPreviewUrl(newPreviewUrl);
      handleInputChange('image', file);
    } else {
      setPreviewUrl(null);
      handleInputChange('image', null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(CARD_VALIDATION_RULES).forEach(field => {
      const error = validateField(field, formData[field], CARD_VALIDATION_RULES);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canSubmit = useMemo(() => {
    const hasRequiredFields = formData.title.trim() &&
                             formData.description.trim() &&
                             formData.image;
    const hasNoErrors = Object.keys(errors).length === 0 ||
                       Object.values(errors).every(error => !error);

    return hasRequiredFields && hasNoErrors && !isSubmitting;
  }, [formData, errors, isSubmitting]);

  const submitForm = async (boardId) => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      const cardData = {
        id: Date.now(),
        boardId: parseInt(boardId),
        title: formData.title.trim(),
        description: formData.description.trim(),
        author: formData.author.trim() || '',
        image: previewUrl,
        upvotes: 0,
        createdAt: new Date().toISOString()
      };

      await new Promise(resolve => setTimeout(resolve, 1000));

      return cardData;
    } catch (error) {
      setErrors({ general: CARD_ERROR_MESSAGES.general.createFailed });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData(DEFAULT_CARD_VALUES);
    setErrors({});
    setIsSubmitting(false);
    if (previewUrl) {
      revokePreviewURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  return {
    formData,
    errors,
    isSubmitting,
    previewUrl,
    canSubmit,
    handleInputChange,
    handleImageChange,
    submitForm,
    resetForm,
    errorMessages: CARD_ERROR_MESSAGES
  };
};
