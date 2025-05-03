import React from 'react';
import SearchBar1 from '../assets/SearchBar-1.png'; // Replace with the correct path to your .png file

function Searchbar1({ className, alt = 'House', width , height }) {
  return (
    <img
      src={SearchBar1}
      className={className}
      alt={alt}
      style={{ width: `${width}px`, height }}
    />
  );
}

export default Searchbar1;
