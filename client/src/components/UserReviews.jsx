import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal'; 

function UserReviews({ UserId }) {
  const [userReviews, setUserReviews] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [editingReview, setEditingReview] = useState(null); 
  const [editedReview, setEditedReview] = useState({
    description: "",
    rating: ""
  });

  const UsersId = UserId || useParams().id;

  useEffect(() => {
    const getUserReviews = async () => {
      try {
        const response = await fetch(`/api/users/${UsersId}/reviews`);
        const data = await response.json();
        setUserReviews(data);
        console.log(data)
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
    console.log('Editing review:', review);
    setEditingReview(review);
    setEditedReview({
      description: review.description,
      rating: review.rating,
    });
    setShowModal(true); 
  };

  
  const handleSaveClick = async (reviewId) => {
    console.log('Updating review with ID:', reviewId);
    console.log('Updated review data:', editedReview); 
  
    try {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
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
      await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      setShowModal(false);
      setUserReviews((prevReviews) =>
        prevReviews.filter((review) => review.review_id !== reviewId)
      );
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  return (
    <div>
      Reviews: {userReviews.length} <br />
      {userReviews.map((review) => (
        <div key={review.review_id}>
          <h4>{review.title}</h4>
          <p>{review.description}</p>
          <p>Rating: {review.rating}</p>
          <button onClick={() => handleEditClick(review)}>Edit</button>
        </div>
      ))}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Edit Review</h2>
        <h4>{editingReview?.title}</h4>
        <textarea
          name="description"
          value={editedReview.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="rating"
          value={editedReview.rating}
          onChange={handleInputChange}
          min="1"
          max="5"
        />
        <button onClick={() => handleSaveClick(editingReview.review_id)}>Save</button>
        <button onClick={() => handleDeleteClick(editingReview.review_id)}>Delete</button>
      </Modal>
    </div>
  );
}

export default UserReviews;
