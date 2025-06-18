export const BOARD_CATEGORIES = [
    { value: 'celebration', label: 'Celebration', color: '#667eea' },
    { value: 'thank-you', label: 'Thank You', color: '#f093fb' },
    { value: 'inspiration', label: 'Inspiration', color: '#4facfe' },
    { value: 'achievement', label: 'Achievement', color: '#43e97b' },
    { value: 'birthday', label: 'Birthday', color: '#fa709a' },
    { value: 'farewell', label: 'Farewell', color: '#ffeaa7' }
  ];

  export const VALIDATION_RULES = {
    title: {
      minLength: 3,
      maxLength: 100,
      required: true
    },
    description: {
      minLength: 10,
      maxLength: 500,
      required: true
    },
    author: {
      minLength: 2,
      maxLength: 50,
      required: false
    },
    category: {
      required: true
    },
    image: {
      required: true,
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    }
  };
  export const ERROR_MESSAGES = {
    title: {
      required: 'Board title is required',
      minLength: `Title must be at least ${VALIDATION_RULES.title.minLength} characters`,
      maxLength: `Title cannot exceed ${VALIDATION_RULES.title.maxLength} characters`
    },
    description: {
      required: 'Board description is required',
      minLength: `Description must be at least ${VALIDATION_RULES.description.minLength} characters`,
      maxLength: `Description cannot exceed ${VALIDATION_RULES.description.maxLength} characters`
    },
    author: {
      minLength: `Author name must be at least ${VALIDATION_RULES.author.minLength} characters`,
      maxLength: `Author name cannot exceed ${VALIDATION_RULES.author.maxLength} characters`
    },
    category: {
      required: 'Please select a category'
    },
    image: {
      required: 'Please upload an image for your board',
      invalidType: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)',
      tooLarge: `Image size cannot exceed ${VALIDATION_RULES.image.maxSize / (1024 * 1024)}MB`
    },
    general: {
      uploadFailed: 'Failed to upload image. Please try again.',
      createFailed: 'Failed to create board. Please try again.',
      networkError: 'Network error. Please check your connection.'
    }
  };

  export const DEFAULT_FORM_VALUES = {
    title: '',
    description: '',
    author: '',
    category: '',
    image: null
  };
