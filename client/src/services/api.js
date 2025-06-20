import { API_CONFIG } from '../config/api';

export const api = {
  getBoards: async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/boards`);
    if (!response.ok) {
      throw new Error('Failed to fetch boards');
    }
    return response.json();
  },

  getBoard: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/boards/${boardId}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Board not found');
      }
      throw new Error('Failed to fetch board');
    }
    return response.json();
  },

  createBoard: async (boardData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boardData),
    });
    if (!response.ok) {
      throw new Error('Failed to create board');
    }
    return response.json();
  },

  deleteBoard: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/boards/${boardId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete board');
    }
    return response.json();
  },

  getKudosCards: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos/board/${boardId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch kudos cards');
    }
    return response.json();
  },

  createKudosCard: async (boardId, cardData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...cardData, boardId }),
    });
    if (!response.ok) {
      throw new Error('Failed to create kudos card');
    }
    return response.json();
  },

  deleteKudosCard: async (boardId, cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos/${cardId}`, {
      method: 'DELETE',
    });
    
    if (response.status === 204) {
      return null;
    }
    
    if (response.status === 404) {
      console.warn(`Card ${cardId} was already deleted`);
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Failed to delete kudos card (${response.status})`);
    }
    
    return null;
  },

  upvoteKudosCard: async (cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos/${cardId}/upvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to upvote kudos card');
    }
    return response.json();
  },

  getComments: async (cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/comments/card/${cardId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return response.json();
  },

  createComment: async (commentData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    return response.json();
  },

  updateComment: async (commentId, commentData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      throw new Error('Failed to update comment');
    }
    return response.json();
  },

  deleteComment: async (commentId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
    if (response.status === 204) {
      return null;
    }
    return response.json();
  }
};
