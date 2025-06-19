import { useState, useCallback } from 'react';
import {
  DEFAULT_CARD_VALUES,
  CARD_VALIDATION_RULES,
  CARD_ERROR_MESSAGES
} from '../constants/boardConstants';
import { validateField } from '../utils/validation';
import { api } from '../services/api';

export const useCreateKudos = () => {
  const [formData, setFormData] = useState(DEFAULT_CARD_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleGifSelect = (gifUrl) => {
    handleInputChange('image', gifUrl);
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

  const canSubmit = formData.title.trim() &&
                   formData.description.trim() &&
                   formData.image &&
                   Object.keys(errors).length === 0 &&
                   !isSubmitting;

  const submitForm = async (boardId) => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      const cardData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        author: formData.author.trim() || '',
        image: formData.image
      };

      const createdCard = await api.createKudosCard(boardId, cardData);
      return createdCard;
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
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    canSubmit,
    handleInputChange,
    handleGifSelect,
    submitForm,
    resetForm,
    errorMessages: CARD_ERROR_MESSAGES
  };
};
