import React, { useState } from 'react';
import './Dashboard.css';
import LogoSection from '../components/LogoSection/LogoSection';
import SearchBar from '../components/SearchBar/SearchBar';
import BoardGrid from '../components/BoardGrid/BoardGrid';
import CreateBoardModal from '../components/CreateBoardModal/CreateBoardModal';
import { useBoards } from '../hooks/useBoards';

const filterButtons = ['all', 'celebration', 'thank-you', 'inspiration', 'recent'];
const filterLabels = {
  'all': 'All',
  'celebration': 'Celebration',
  'thank-you': 'Thank You',
  'inspiration': 'Inspiration',
  'recent': 'Recent'
};

const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    boards,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    handleClearSearch,
    handleFilterChange,
    handleDeleteBoard,
    addBoard
  } = useBoards();

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading boards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <LogoSection />
        <SearchBar
          searchQuery={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={handleClearSearch}
          placeholder="Search boards..."
        />
      </header>

      <div className="filter-section">
        <div className="filter-buttons">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${selectedCategory === filter ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filterLabels[filter]}
            </button>
          ))}
        </div>
      </div>

      <main className="dashboard-main">
        <div className="create-board-container">
          <button className="create-board-btn" onClick={() => setIsCreateModalOpen(true)}>
            Create a New Board
          </button>
        </div>

        <BoardGrid
          boards={boards}
          onDeleteBoard={handleDeleteBoard}
          emptyMessage="No boards match your search. Try a different search term or create a new board!"
        />
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2024 Kudoboard</p>
      </footer>

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={addBoard}
      />
    </div>
  );
};

export default Dashboard;
