import React, { useState, useEffect } from 'react';
import './GifSearch.css';
import { GIPHY_CONFIG } from '../../config/giphy';

const GifSearch = ({ onSelect, selectedGifUrl }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = searchTerm.trim() ? 'search' : 'trending';
        const limit = 6;
        const url = `${GIPHY_CONFIG.API_URL}/${endpoint}?api_key=${GIPHY_CONFIG.API_KEY}&limit=${limit}&rating=${GIPHY_CONFIG.RATING}${searchTerm.trim() ? `&q=${encodeURIComponent(searchTerm)}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch GIFs');
        }

        const { data } = await response.json();
        setGifs(data.map(gif => ({
          id: gif.id,
          url: gif.images.fixed_height.url
        })));
      } catch (err) {
        setError('Failed to load GIFs');
        setGifs([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchGifs, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  return (
    <div className="gif-search">
      <input
        type="text"
        className="gif-search-input"
        placeholder="Search for GIFs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="gif-grid">
        {loading && <div className="gif-loading">Loading...</div>}
        {error && <div className="gif-error">{error}</div>}
        {!loading && !error && gifs.map(gif => (
          <div
            key={gif.id}
            className={`gif-item ${selectedGifUrl === gif.url ? 'selected' : ''}`}
            onClick={() => onSelect(gif.url)}
          >
            <img
              src={gif.url}
              alt="GIF"
              className="gif-preview"
              loading="lazy"
            />
            {selectedGifUrl === gif.url && <div className="gif-selected-overlay">✓</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GifSearch;
