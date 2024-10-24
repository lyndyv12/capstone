import React from 'react';

function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onClose} className="close-btn">X</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
