import { ERROR_MESSAGES } from '../constants/boardConstants';

const API_BASE_URL = 'http://localhost:3000/api';

export const createBoard = async (boardData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockBoard = {
    id: Date.now(),
    title: boardData.title,
    description: boardData.description,
    category: boardData.category,
    author: boardData.author || 'Anonymous',
    image: boardData.image ? URL.createObjectURL(boardData.image) : null,
    createdAt: new Date().toISOString().split('T')[0],
    kudosCount: 0
  };

  return mockBoard;
};
