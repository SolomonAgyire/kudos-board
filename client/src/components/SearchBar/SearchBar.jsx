
import React from 'react';
import './SearchBar.css';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  onClear,
  placeholder = "Search boards..."
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button className="clear-btn" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
