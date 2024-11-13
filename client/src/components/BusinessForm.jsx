import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const BusinessForm = ({ authId, onClose }) => {
  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !businessType || !address || !imageUrl) { 
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch('${import.meta.env.VITE_BACKEND_URL}/api/businesses/create', {
        method: 'POST',
        body: JSON.stringify({ name, businessType, address, imageUrl, user_id: authId }), 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        onClose();
      } else {
        throw new Error("Failed to create business.");
      }
    } catch (ex) {
      setError(ex.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Add New Business</Typography>
      {error && <div className='error'>{error}</div>}
      <TextField 
        label="Business Name" 
        variant="outlined" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        fullWidth 
        margin="normal" 
      />
      <TextField 
        label="Business Type" 
        variant="outlined" 
        value={businessType} 
        onChange={(e) => setBusinessType(e.target.value)} 
        fullWidth 
        margin="normal" 
      />
      <TextField 
        label="Street Address" 
        variant="outlined" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        fullWidth 
        margin="normal" 
      />
      <TextField 
        label="Image URL" 
        variant="outlined" 
        value={imageUrl} 
        onChange={(e) => setImageUrl(e.target.value)} 
        fullWidth 
        margin="normal" 
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Submit
      </Button>
    </form>
  );
};

export default BusinessForm;