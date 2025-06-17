import React, { useState } from 'react';
import './Dashboard.css';
import logo from '../assets/images/logo.jpg';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filterButtons = ['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'];

  const handleSearch = () => {

  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo-container">
          <img src={logo} alt="Kudoboard Logo" className="logo" />
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search boards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </header>

      <div className="filter-section">
        <div className="filter-buttons">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter)}
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

        <div className="boards-grid">
          <p>Board cards coming soon...</p>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2024 Kudoboard</p>
      </footer>
    </div>
  );
};

export default Dashboard;
