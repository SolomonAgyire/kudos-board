import React, { useState } from 'react';
import './Dashboard.css';
import logo from '../assets/images/logo.jpg';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {

  };

  const handleClear = () => {
    setSearchQuery('');
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

      <main className="dashboard-main">
        <p>Dashboard content coming soon...</p>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2024 Kudoboard</p>
      </footer>
    </div>
  );
};

export default Dashboard;
