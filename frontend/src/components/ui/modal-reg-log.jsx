// src/components/Modal.jsx
import React from 'react';
import '../../styles/App.css';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="main-modal-overlay">
      <div className="main-modal-content">
        <button className="main-close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
