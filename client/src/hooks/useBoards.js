import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useBoards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        const data = await api.getBoards();
        setBoards(data);
      } catch (err) {
        console.error('Error fetching boards:', err);
        setError('Failed to load boards');
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleFilterChange = (filter) => {
    setSelectedCategory(filter);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await api.deleteBoard(boardId);
      setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
    } catch (err) {
      console.error('Error deleting board:', err);
      setError('Failed to delete board');
    }
  };

  const addBoard = async (newBoard) => {
    try {
      const createdBoard = await api.createBoard(newBoard);
      setBoards(prevBoards => [createdBoard, ...prevBoards]);
      return createdBoard;
    } catch (err) {
      console.error('Error creating board:', err);
      setError('Failed to create board');
      throw err;
    }
  };

  // Simple filtering - no complex logic
  let filteredBoards = boards;

  if (selectedCategory === 'recent') {
    filteredBoards = boards.slice(0, 6);
  } else if (selectedCategory !== 'all') {
    filteredBoards = boards.filter(board => board.category === selectedCategory);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    filteredBoards = filteredBoards.filter(board =>
      board.title.toLowerCase().includes(term) ||
      board.description.toLowerCase().includes(term)
    );
  }

  return {
    boards: filteredBoards,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    handleClearSearch,
    handleFilterChange,
    handleDeleteBoard,
    addBoard
  };
};

export default useBoards;
