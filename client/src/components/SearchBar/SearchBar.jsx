import React from 'react';
import './SearchBar.css';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  onSearch,
  onClear,
  placeholder = "Search boards..."
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
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
        onKeyPress={handleKeyPress}
      />
      <button className="search-btn" onClick={onSearch}>
        Search
      </button>
      <button className="clear-btn" onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
