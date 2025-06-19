import { VALIDATION_RULES, ERROR_MESSAGES } from '../constants/boardConstants';

export const validateField = (field, value, rules) => {
  const fieldRules = rules[field];
  if (!fieldRules) return null;

  if (fieldRules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return `${field} is required`;
  }

  if (value) {
    if (typeof value === 'string') {
      if (fieldRules.minLength && value.trim().length < fieldRules.minLength) {
        return `${field} must be at least ${fieldRules.minLength} characters`;
      }

      if (fieldRules.maxLength && value.trim().length > fieldRules.maxLength) {
        return `${field} cannot exceed ${fieldRules.maxLength} characters`;
      }
    }

    if (fieldRules.isUrl && typeof value === 'string') {
      try {
        new URL(value);
      } catch {
        return `Invalid URL for ${field}`;
      }
    }
  }

  return null;
};

export const validateForm = (formData) => {
  const errors = {};
  Object.keys(formData).forEach(fieldName => {
    const error = validateField(fieldName, formData[fieldName], VALIDATION_RULES);
    if (error) {
      errors[fieldName] = error;
    }
  });
  return errors;
};

export const isFormValid = (formData, rules) => {
  for (const field in rules) {
    const error = validateField(field, formData[field], rules);
    if (error) return false;
  }
  return true;
};
