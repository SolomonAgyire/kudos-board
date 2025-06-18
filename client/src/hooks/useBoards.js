import { useState, useEffect } from 'react';
import { MOCK_BOARDS } from '../constants/boardConstants';
import congratulationsImg from '../assets/images/congratulations.gif';

export const useBoards = () => {
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setBoards(MOCK_BOARDS);
        setFilteredBoards(MOCK_BOARDS);
      } catch (err) {
        setError('Failed to load boards');
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    let filtered = boards;

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(board =>
        board.title.toLowerCase().includes(searchTermLower) ||
        board.description.toLowerCase().includes(searchTermLower) ||
        (board.author && board.author.toLowerCase().includes(searchTermLower))
      );
    }

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'recent') {
        // Show boards created within the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        filtered = filtered.filter(board => {
          const boardDate = new Date(board.createdAt);
          return boardDate >= sevenDaysAgo;
        });
      } else {
        // Regular category filtering
        filtered = filtered.filter(board => board.category === selectedCategory);
      }
    }

    setFilteredBoards(filtered);
  }, [boards, searchTerm, selectedCategory]);

  const handleSearch = () => {
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleFilterChange = (filter) => {
    setSelectedCategory(filter);
  };

  const handleViewBoard = (boardId) => {
  };

  const handleDeleteBoard = (boardId) => {
    console.log('Delete board:', boardId);
    setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
  };

  const addBoard = (newBoard) => {
    const boardWithId = {
      ...newBoard,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      kudosCount: 0
    };
    setBoards(prevBoards => [boardWithId, ...prevBoards]);
  };

  return {
    boards: filteredBoards,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    handleSearch,
    handleClearSearch,
    handleFilterChange,
    handleViewBoard,
    handleDeleteBoard,
    addBoard
  };
};

export default useBoards;
