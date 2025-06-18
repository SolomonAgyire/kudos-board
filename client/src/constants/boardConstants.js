export const BOARD_CATEGORIES = [
  { value: 'celebration', label: 'Celebration', color: '#667eea' },
  { value: 'thank-you', label: 'Thank You', color: '#f093fb' },
  { value: 'inspiration', label: 'Inspiration', color: '#4facfe' }
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
    required: 'Please upload an image for your card',
    invalidType: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)',
    tooLarge: `Image size cannot exceed ${CARD_VALIDATION_RULES.image.maxSize / (1024 * 1024)}MB`
  },
  general: {
    uploadFailed: 'Failed to upload image. Please try again.',
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

export const MOCK_BOARDS = [
  {
    id: 1,
    title: "Team Celebration",
    description: "Celebrating our amazing team achievements this quarter",
    category: "celebration",
    author: "Sarah Johnson",
    image: "/src/assets/images/congratulations.gif",
    kudosCount: 12,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Thank You Notes",
    description: "A space to express gratitude to our colleagues",
    category: "thank-you",
    author: "Mike Chen",
    image: "/src/assets/images/congratulations.gif",
    kudosCount: 8,
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    title: "Daily Inspiration",
    description: "Share motivational quotes and inspiring stories",
    category: "inspiration",
    author: "",
    image: "/src/assets/images/congratulations.gif",
    kudosCount: 15,
    createdAt: "2024-01-08"
  },
  {
    id: 4,
    title: "Latest Updates",
    description: "Recent news and updates from our team",
    category: "celebration",
    author: "Lisa Park",
    image: "/src/assets/images/congratulations.gif",
    kudosCount: 6,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 1 day ago
  },
  {
    id: 5,
    title: "Recent Wins",
    description: "Celebrating our most recent accomplishments",
    category: "thank-you",
    author: "Tom Wilson",
    image: "/src/assets/images/congratulations.gif",
    kudosCount: 9,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 3 days ago
  },
  {
    id: 6,
    title: "This Week's Highlights",
    description: "Showcasing the best moments from this week",
    category: "inspiration",
    author: "Alex Chen",
    image: "/src/assets/images/congratulations.gif",
    kudosCount: 11,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 5 days ago
  }
];

export const MOCK_CARDS = {
  1: [
    {
      id: 1,
      boardId: 1,
      title: "Amazing Quarter Results!",
      description: "Our team exceeded all expectations this quarter. Great job everyone!",
      author: "John Smith",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 15,
      createdAt: "2024-01-16"
    },
    {
      id: 2,
      boardId: 1,
      title: "New Client Success",
      description: "Successfully onboarded three major clients this month. Fantastic teamwork!",
      author: "Emma Davis",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 12,
      createdAt: "2024-01-15"
    },
    {
      id: 3,
      boardId: 1,
      title: "Innovation Award",
      description: "Our innovative approach won the company-wide innovation award!",
      author: "",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 20,
      createdAt: "2024-01-14"
    },
    {
      id: 4,
      boardId: 1,
      title: "Team Spirit",
      description: "The collaboration and support within our team is truly inspiring.",
      author: "Alex Rodriguez",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 8,
      createdAt: "2024-01-13"
    }
  ],
  2: [
    {
      id: 5,
      boardId: 2,
      title: "Thank You Sarah!",
      description: "Thank you for always being there to help with complex problems.",
      author: "Mike Johnson",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 10,
      createdAt: "2024-01-12"
    },
    {
      id: 6,
      boardId: 2,
      title: "Grateful for Support",
      description: "I'm grateful for all the support during my project deadline.",
      author: "Lisa Chen",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 7,
      createdAt: "2024-01-11"
    }
  ],
  3: [
    {
      id: 7,
      boardId: 3,
      title: "Never Give Up",
      description: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 25,
      createdAt: "2024-01-10"
    },
    {
      id: 8,
      boardId: 3,
      title: "Dream Big",
      description: "The future belongs to those who believe in the beauty of their dreams.",
      author: "",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 18,
      createdAt: "2024-01-09"
    },
    {
      id: 9,
      boardId: 3,
      title: "Progress Over Perfection",
      description: "Small progress is still progress. Keep moving forward!",
      author: "Team Lead",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 14,
      createdAt: "2024-01-08"
    }
  ],
  4: [
    {
      id: 10,
      boardId: 4,
      title: "New Feature Launch",
      description: "Just launched our new dashboard feature. User feedback has been amazing!",
      author: "Product Team",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 22,
      createdAt: "2024-01-20"
    },
    {
      id: 11,
      boardId: 4,
      title: "Client Meeting Success",
      description: "Had a fantastic meeting with our biggest client today. They're impressed!",
      author: "Sales Team",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 16,
      createdAt: "2024-01-19"
    }
  ],
  5: [
    {
      id: 12,
      boardId: 5,
      title: "Record Breaking Month",
      description: "This month we broke all previous records for user engagement!",
      author: "Analytics Team",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 28,
      createdAt: "2024-01-18"
    },
    {
      id: 13,
      boardId: 5,
      title: "Team Collaboration Win",
      description: "The way our teams worked together on the recent project was incredible.",
      author: "Project Manager",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 19,
      createdAt: "2024-01-17"
    }
  ],
  6: [
    {
      id: 14,
      boardId: 6,
      title: "Innovation Workshop",
      description: "Yesterday's innovation workshop generated so many great ideas!",
      author: "Innovation Team",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 21,
      createdAt: "2024-01-16"
    },
    {
      id: 15,
      boardId: 6,
      title: "Customer Satisfaction Peak",
      description: "Our customer satisfaction scores reached an all-time high this week!",
      author: "Customer Success",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 24,
      createdAt: "2024-01-15"
    },
    {
      id: 16,
      boardId: 6,
      title: "Code Review Excellence",
      description: "The quality of code reviews this week has been outstanding. Great work!",
      author: "Tech Lead",
      image: "/src/assets/images/congratulations.gif",
      upvotes: 17,
      createdAt: "2024-01-14"
    }
  ]
};
