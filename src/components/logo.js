import React from 'react';
import logo from '../assets/logo.png'; // Replace with the correct path to your .png file
import {Link} from 'react-router-dom';
function Logo({ className, alt = 'Logo', width = 180, height = 72 }) {
  return (
    <Link to="/home">
      <img
        src={logo}
        className={className}
        alt={alt}
        style={{ width: `${width}px`, height }}
      />
    </Link>
  );
}

export default Logo;
