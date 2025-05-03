import React from 'react';
import SearchBar3 from '../assets/SearchBar-3.png'; // Replace with the correct path to your .png file

function Searchbar3({ className, alt = 'SearchBar3', width, height}) {
  return (
    <img
      src={SearchBar3}
      className={className}
      alt={alt}
      style={{ width: `${width}px`, height }}
    />
  );
}

export default Searchbar3;
