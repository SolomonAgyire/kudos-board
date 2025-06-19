import { useState, useCallback } from 'react';
import { DEFAULT_FORM_VALUES, BOARD_CATEGORIES } from '../constants/boardConstants';
import { validateField } from '../utils/validation';
import { api } from '../services/api';

export const useCreateBoard = () => {
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const canSubmit = formData.title.trim() &&
                   formData.description.trim() &&
                   formData.category &&
                   Object.keys(errors).length === 0 &&
                   !isSubmitting;

  const handleSubmit = async (onSuccess) => {
    if (!canSubmit) return false;

    setIsSubmitting(true);
    try {
      const selectedCategory = BOARD_CATEGORIES.find(cat => cat.value === formData.category);
      const randomImage = selectedCategory.defaultImages[Math.floor(Math.random() * selectedCategory.defaultImages.length)];

      const boardData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        author: formData.author.trim() || '',
        image: randomImage
      };

      const createdBoard = await api.createBoard(boardData);
      onSuccess?.(createdBoard);
      return createdBoard;
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: 'Failed to create board' }));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData(DEFAULT_FORM_VALUES);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    canSubmit,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};
