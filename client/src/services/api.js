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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to create board (${response.status})`);
    }
    return response.json();
  },

  deleteBoard: async (boardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/boards/${boardId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Board ${boardId} was already deleted or doesn't exist`);
        return null;
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to delete board (${response.status})`);
    }

    if (response.status === 204) {
      return null;
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
      body: JSON.stringify({
        ...cardData,
        boardId: parseInt(boardId),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to create kudos card (${response.status})`);
    }
    return response.json();
  },

  upvoteKudosCard: async (cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos/${cardId}/upvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to upvote kudos card (${response.status})`);
    }
    return response.json();
  },

  pinKudosCard: async (cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos/${cardId}/pin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to pin kudos card (${response.status})`);
    }
    return response.json();
  },

  deleteKudosCard: async (boardId, cardId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/kudos/${cardId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Card ${cardId} was already deleted or doesn't exist`);
        return null;
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to delete kudos card (${response.status})`);
    }

    if (response.status === 204) {
      return null;
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

  createComment: async (cardId, commentData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...commentData,
        cardId: parseInt(cardId),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to create comment (${response.status})`);
    }
    return response.json();
  },

  deleteComment: async (commentId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to delete comment (${response.status})`);
    }

    if (response.status === 204) {
      return null;
    }
    return response.json();
  },
};
