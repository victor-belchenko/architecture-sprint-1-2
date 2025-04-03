import React from 'react';
import './Modal_place.css';

const Modal_place = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Модальное окно для описания Места</h2>
        {children}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal_place;