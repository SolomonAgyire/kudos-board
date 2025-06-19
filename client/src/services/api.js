
import { API_CONFIG } from '../config/api';

export const api = {
  // Board endpoints
  getBoards: async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/boards`);
    if (!response.ok) throw new Error('Failed to fetch boards');
    return response.json();
  },

  getBoard: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/boards/${boardId}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Board not found');
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
    if (!response.ok) throw new Error('Failed to create board');
    return response.json();
  },

  deleteBoard: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/boards/${boardId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete board');
    return response.json();
  },

  // Kudos card endpoints
  getKudosCards: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos/board/${boardId}`);
    if (!response.ok) throw new Error('Failed to fetch kudos cards');
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
    if (!response.ok) throw new Error('Failed to create kudos card');
    return response.json();
  },

  deleteKudosCard: async (boardId, cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos/${cardId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete kudos card');
    if (response.status === 204) return null;
    return response.json();
  },

  upvoteKudosCard: async (cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos/${cardId}/upvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to upvote kudos card');
    return response.json();
  }
};
