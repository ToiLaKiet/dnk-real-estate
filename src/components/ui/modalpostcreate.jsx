// src/components/Modal.jsx
import React from 'react';
import '../../styles/App.css';

function Modal1({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay-create">
      <div className="modal-content-create">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal1;
