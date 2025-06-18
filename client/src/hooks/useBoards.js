import { useState, useMemo, useEffect } from 'react';
import congratulationsImg from '../assets/images/congratulations.gif';

const useBoards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [boards, setBoards] = useState([]);

  const mockBoards = [
    {
      id: 1,
      title: "Team Celebration",
      description: "Celebrating our amazing team achievements this quarter!",
      category: "Celebration",
      image: congratulationsImg,
      createdAt: "2024-01-15",
      kudosCount: 12
    },
    {
      id: 2,
      title: "Project Success",
      description: "Thank you everyone for the successful project launch!",
      category: "Thank You",
      image: congratulationsImg,
      createdAt: "2024-01-10",
      kudosCount: 8
    },
    {
      id: 3,
      title: "Daily Motivation",
      description: "Share your daily inspiration and motivational quotes here.",
      category: "Inspiration",
      image: congratulationsImg,
      createdAt: "2024-01-08",
      kudosCount: 15
    },
    {
      id: 4,
      title: "Birthday Wishes",
      description: "Celebrating Sarah's birthday with lots of love and wishes!",
      category: "Celebration",
      image: congratulationsImg,
      createdAt: "2024-01-05",
      kudosCount: 20
    },
    {
      id: 5,
      title: "Innovation Awards",
      description: "Recognizing innovative ideas and creative solutions from our team.",
      category: "Thank You",
      image: congratulationsImg,
      createdAt: "2024-01-03",
      kudosCount: 6
    },
    {
      id: 6,
      title: "Weekly Inspiration",
      description: "Start your week with positive energy and motivational thoughts.",
      category: "Inspiration",
      image: congratulationsImg,
      createdAt: "2024-01-01",
      kudosCount: 11
    }
  ];

  useEffect(() => {
    setBoards(mockBoards);
  }, []);
  const filteredBoards = useMemo(() => {
    let filtered = boards;

    if (activeFilter !== 'All') {
      if (activeFilter === 'Recent') {
        filtered = [...boards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        filtered = boards.filter(board => board.category === activeFilter);
      }
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter(board =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, activeFilter, boards]);
  const handleSearch = () => {
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
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
    searchQuery,
    activeFilter,
    boards: filteredBoards,
    setSearchQuery,
    handleSearch,
    handleClearSearch,
    handleFilterChange,
    handleViewBoard,
    handleDeleteBoard,
    addBoard
  };
};

export default useBoards;
