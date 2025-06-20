import { API_CONFIG } from '../config/api';

export const api = {
  getBoards: async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/boards`);
    if (!response.ok) throw new Error('Failed to fetch boards');
    return response.json();
  },

  getBoard: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/boards/${boardId}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Board not found');
      throw new Error('Failed to fetch board');
    }
    return response.json();
  },

  createBoard: async (boardData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boardData),
    });
    if (!response.ok) throw new Error('Failed to create board');
    return response.json();
  },

  deleteBoard: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/boards/${boardId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete board');
    if (response.status === 204) return null;
    return response.json();
  },

  getKudosCards: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/kudos/board/${boardId}`);
    if (!response.ok) throw new Error('Failed to fetch kudos cards');
    return response.json();
  },

  createKudosCard: async (boardId, cardData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/kudos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...cardData, boardId }),
    });
    if (!response.ok) throw new Error('Failed to create kudos card');
    return response.json();
  },

  deleteKudosCard: async (boardId, cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/kudos/${cardId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete kudos card');
    if (response.status === 204) return null;
    return response.json();
  },

  upvoteKudosCard: async (cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/kudos/${cardId}/upvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to upvote kudos card');
    return response.json();
  },

  togglePinKudosCard: async (cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/kudos/${cardId}/toggle-pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to toggle pin status');
    return response.json();
  },

  getComments: async (cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/comments/card/${cardId}`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },

  createComment: async (commentData) => {
    // card: int
    const processedData = {
      ...commentData,
      cardId: parseInt(commentData.cardId),
    };

    const response = await fetch(`${API_CONFIG.BASE_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error response:', errorData);
      throw new Error(errorData.error || 'Failed to create comment');
    }

    return response.json();
  },

  updateComment: async (commentId, commentData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) throw new Error('Failed to update comment');
    return response.json();
  },

  deleteComment: async (commentId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete comment');
    if (response.status === 204) return null;
    return response.json();
  },
};
