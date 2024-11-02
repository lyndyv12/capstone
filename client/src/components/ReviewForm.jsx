import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import './ReviewForm.css';

const ReviewForm = ({ authId, mode = 'create', businesses, setRefreshReviews, businessId }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user_id = authId;
  const [business_id, setBusiness_Id] = useState(businessId || '');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');

  const reviewFormAction = async (details, mode) => {
    const response = await fetch(`/api/reviews/${mode}`, {
      method: 'POST',
      body: JSON.stringify(details),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An unexpected error occurred.');
    }
    return await response.json();
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!title || !description || !rating || !business_id) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await reviewFormAction(
        { title, description, user_id, business_id, rating },
        mode
      );

      if (response && response.id) {
        setRefreshReviews((prev) => !prev);
        navigate(`/businesses/${business_id}`);
        setError('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (ex) {
      setError(ex.message);
    }
  };

  return (
    <div className="form-container">
      {error && <Typography className="error-message">{error}</Typography>}

      <TextField
        label="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        fullWidth
      />

      <TextField
        label="Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
        fullWidth
        multiline
        rows={4}
      />

      <TextField
        label="Rating (1-5)"
        type="number"
        inputProps={{ min: 1, max: 5 }}
        value={rating}
        onChange={(ev) => setRating(Number(ev.target.value))}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Select a business</InputLabel>
        <Select
          value={business_id}
          onChange={(ev) => setBusiness_Id(ev.target.value)}
        >
          <MenuItem value="" disabled>
            Select a business
          </MenuItem>
          {businesses?.map((business) => (
            <MenuItem key={business.id} value={business.id}>
              {business.name_full}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={submit}
        className="submit-button"
      >
        {mode === 'create' ? 'Create Review' : 'Edit Review'}
      </Button>
    </div>
  );
};

export default ReviewForm;
