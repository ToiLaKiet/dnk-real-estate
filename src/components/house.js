import React from 'react';
import house from '../assets/house.png'; // Replace with the correct path to your .png file

function House({ className, alt = 'House', width = 332, height = 319 }) {
  return (
    <img
      src={house}
      className={className}
      alt={alt}
      style={{ width: `${width}px`, height }}
    />
  );
}

export default House;
