
import { ERROR_MESSAGES } from '../constants/boardConstants';

const API_BASE_URL = 'http://localhost:3000/api';

export const createBoard = async (boardData) => {
  try {
    let imageUrl = null;
    if (boardData.image) {
      imageUrl = '/src/assets/images/congratulations.gif';
    }

    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...boardData,
        image: imageUrl || '/src/assets/images/congratulations.gif',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create board');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};

export const getBoards = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards`);
    if (!response.ok) {
      throw new Error('Failed to fetch boards');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

export const getRecentBoards = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/recent`);
    if (!response.ok) {
      throw new Error('Failed to fetch recent boards');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recent boards:', error);
    throw error;
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete board');
    }
  } catch (error) {
    console.error('Error deleting board:', error);
    throw error;
  }
};
