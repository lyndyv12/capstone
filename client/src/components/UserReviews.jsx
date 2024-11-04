import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import './UserReviews.css';

function UserReviews({ UserId, auth }) {
  const [userReviews, setUserReviews] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [editingReview, setEditingReview] = useState(null); 
  const [editedReview, setEditedReview] = useState({
    description: "",
    rating: ""
  });


  const UsersId = UserId || useParams().id;
  const currentUserId = auth?.id;
  const isUser = () => {
    console.log(UsersId);
    console.log(currentUserId); 
    return UsersId === currentUserId;
  };
  


  


  useEffect(() => {
    const getUserReviews = async () => {
      try {
        const response = await fetch(`/api/users/${UsersId}/reviews`);
        const data = await response.json();
        setUserReviews(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (UsersId) {
      getUserReviews();
    }
  }, [UsersId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedReview({ ...editedReview, [name]: value });
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    setEditedReview({
      description: review.description,
      rating: review.rating,
    });
    setShowModal(true); 
  };

  const handleSaveClick = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedReview),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update review.');
      }

      const updatedReview = await response.json();
      setUserReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.review_id === reviewId ? updatedReview : review
        )
      );

      setShowModal(false);
    } catch (error) {
      console.error('Error saving review:', error); 
    }
  };

  const handleDeleteClick = async (reviewId) => {
    try {
      await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });

      setUserReviews((prevReviews) =>
        prevReviews.filter((review) => review.review_id !== reviewId)
      );
      setShowModal(false);
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Reviews: {userReviews.length}</Typography>
      
      {userReviews.map((review) => (
        <Card key={review.review_id} className="review-card">
          <CardContent>
            <Typography variant="h6" className="review-title">{review.title}</Typography>
            <Typography variant="body2" className="review-description">{review.description}</Typography>
            <Typography variant="body2" className="review-rating">Rating: {review.rating}</Typography>
          </CardContent>
          
          {isUser() && (
            <CardActions>
              <Button variant="outlined" onClick={() => handleEditClick(review)} className="modal-button">
                Edit
              </Button>
            </CardActions>
          )}
        </Card>
      ))}

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent className="dialog-content">
          <Typography variant="h6">{editingReview?.title}</Typography>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={editedReview.description}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={editedReview.rating}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSaveClick(editingReview.review_id)} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={() => handleDeleteClick(editingReview.review_id)} variant="outlined" color="secondary">
            Delete
          </Button>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserReviews;
