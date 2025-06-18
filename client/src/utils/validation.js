import { VALIDATION_RULES, ERROR_MESSAGES } from '../constants/boardConstants';

export const validateField = (fieldName, value) => {
  const rules = VALIDATION_RULES[fieldName];
  const messages = ERROR_MESSAGES[fieldName];

  if (!rules) return null;

  if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return messages.required;
  }

  if (!rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return null;
  }

  if (typeof value === 'string') {
    if (rules.minLength && value.trim().length < rules.minLength) {
      return messages.minLength;
    }
    if (rules.maxLength && value.trim().length > rules.maxLength) {
      return messages.maxLength;
    }
  }

  if (fieldName === 'image' && value instanceof File) {
    if (!rules.allowedTypes.includes(value.type)) {
      return messages.invalidType;
    }
    if (value.size > rules.maxSize) {
      return messages.tooLarge;
    }
  }

  return null;
};

export const validateForm = (formData) => {
  const errors = {};
  Object.keys(formData).forEach(fieldName => {
    const error = validateField(fieldName, formData[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });
  return errors;
};

export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
