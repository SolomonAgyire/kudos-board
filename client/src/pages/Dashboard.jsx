import React from 'react';
import './Dashboard.css';
import LogoSection from '../components/LogoSection/LogoSection';
import SearchBar from '../components/SearchBar/SearchBar';
import BoardGrid from '../components/BoardGrid/BoardGrid';
import useBoards from '../hooks/useBoards';

const Dashboard = () => {
  const {
    searchQuery,
    activeFilter,
    boards,
    setSearchQuery,
    handleSearch,
    handleClearSearch,
    handleFilterChange,
    handleViewBoard,
    handleDeleteBoard
  } = useBoards();

  const filterButtons = ['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <LogoSection />

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search boards..."
        />
      </header>

      <div className="filter-section">
        <div className="filter-buttons">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <main className="dashboard-main">
        <div className="create-board-container">
          <button className="create-board-btn">
            Create a New Board
          </button>
        </div>

        <BoardGrid
          boards={boards}
          onViewBoard={handleViewBoard}
          onDeleteBoard={handleDeleteBoard}
          emptyMessage="No boards match your search. Try a different search term or create a new board!"
        />
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2024 Kudoboard</p>
      </footer>
    </div>
  );
};

export default Dashboard;
