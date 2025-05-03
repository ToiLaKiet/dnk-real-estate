import React from 'react';
import SearchBar4 from '../assets/SearchBar-4.png'; // Replace with the correct path to your .png file

function Searchbar2({ className, alt = 'Searchbar4', width , height}) {
  return (
    <img
      src={SearchBar4}
      className={className}
      alt={alt}
      style={{ width: `${width}px`, height }}
    />
  );
}

export default Searchbar2;
