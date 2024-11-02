import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Modal.css';

function Modal({ show, onClose, children }) {
  return (
    <Dialog open={show} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          className="close-btn"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className="modal-content">
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
