export const BOARD_CATEGORIES = [
  {
    value: 'celebration',
    label: 'Celebration',
    color: '#667eea',
    defaultImages: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176',
      'https://images.unsplash.com/photo-1531686264889-56fdcabd163f',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d'
    ]
  },
  {
    value: 'thank-you',
    label: 'Thank You',
    color: '#f093fb',
    defaultImages: [
      'https://images.unsplash.com/photo-1606103920295-9a091d2923b3',
      'https://images.unsplash.com/photo-1499744937866-d7e566a20a61',
      'https://images.unsplash.com/photo-1522598134697-f34a6d8aa3c4'
    ]
  },
  {
    value: 'inspiration',
    label: 'Inspiration',
    color: '#4facfe',
    defaultImages: [
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d'
    ]
  }
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
    required: false,
    isUrl: true
  }
};

export const CARD_VALIDATION_RULES = {
  title: {
    minLength: 3,
    maxLength: 80,
    required: true
  },
  description: {
    minLength: 5,
    maxLength: 300,
    required: true
  },
  author: {
    minLength: 2,
    maxLength: 50,
    required: false
  },
  image: {
    required: true,
    isUrl: true
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
    required: 'Please select a GIF',
    invalidUrl: 'Invalid GIF URL. Please select another GIF'
  },
  general: {
    createFailed: 'Failed to create board. Please try again.',
    networkError: 'Network error. Please check your connection.'
  }
};

export const CARD_ERROR_MESSAGES = {
  title: {
    required: 'Card title is required',
    minLength: `Title must be at least ${CARD_VALIDATION_RULES.title.minLength} characters`,
    maxLength: `Title cannot exceed ${CARD_VALIDATION_RULES.title.maxLength} characters`
  },
  description: {
    required: 'Card description is required',
    minLength: `Description must be at least ${CARD_VALIDATION_RULES.description.minLength} characters`,
    maxLength: `Description cannot exceed ${CARD_VALIDATION_RULES.description.maxLength} characters`
  },
  author: {
    minLength: `Author name must be at least ${CARD_VALIDATION_RULES.author.minLength} characters`,
    maxLength: `Author name cannot exceed ${CARD_VALIDATION_RULES.author.maxLength} characters`
  },
  image: {
    required: 'Please select a GIF',
    invalidUrl: 'Invalid GIF URL. Please select another GIF'
  },
  general: {
    createFailed: 'Failed to create card. Please try again.',
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

export const DEFAULT_CARD_VALUES = {
  title: '',
  description: '',
  author: '',
  image: null
};
