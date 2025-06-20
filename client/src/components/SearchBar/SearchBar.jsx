import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, onSearchChange, onClear, placeholder = 'Search boards...' }) => {
  const handleSearch = () => {
    // Trigger the same search function that's called when typing
    if (searchQuery) {
      onSearchChange(searchQuery);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
      {searchQuery && (
        <button className="clear-btn" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
