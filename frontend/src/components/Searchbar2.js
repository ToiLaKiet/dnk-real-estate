import React from 'react';
import SearchBar2 from '../assets/SearchBar-2.png'; // Replace with the correct path to your .png file

function Searchbar2({ className, alt = 'Searchbar2', width, height }) {
  return (
    <img
      src={SearchBar2}
      className={className}
      alt={alt}
      style={{ width: `${width}px`, height }}
    />
  );
}

export default Searchbar2;
