import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import '../styles//Logo.css'; // Tạo file CSS riêng cho component

function Logo({ className = '', alt = 'Logo', width = 180, height = 72 }) {
  return (
    <Link to="/home" className={`logo-link ${className}`}>
      <img
        src={logo}
        className="logo-img"
        alt={alt}
        style={{ 
          '--logo-width': `${width}px`,
          '--logo-height': `${height}px`
        }}
      />
    </Link>
  );
}

export default Logo;
