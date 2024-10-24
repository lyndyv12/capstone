import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ authId, mode = 'create', businesses, setRefreshReviews, businessId }) => { 
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user_id = authId
  const [business_id, setBusiness_Id] = useState(businessId || '');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');


  const reviewFormAction = async (details, mode) => {
    const response = await fetch(`/api/reviews/${mode}`, {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An unexpected error occurred.");
    }
  
    return await response.json();
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!title || !description || !rating || !business_id) {
      setError("Please fill in all fields.");
      return; 
    }

    console.log("First Submitting review with:", { title, description, user_id, business_id, rating });

    try {
      console.log("Submitting review with:", { title, description, user_id, business_id, rating });
      const response = await reviewFormAction({ title, description, user_id, business_id, rating }, mode);
      console.log("Response from server:", response);

      if (response && response?.id) {
        setRefreshReviews(prev => !prev);
        navigate(`/businesses/${business_id}`);
        setError('');
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (ex) {
      console.error("Error caught:", ex);

      setError(ex.message);
    }
  };

  return (
    <div>
    <form onSubmit={submit}>
      {!!error && <div className='error'>{error}</div>}
      <input
        value={title}
        placeholder='Title'
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        value={description}
        placeholder='Description'
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <input
        value={rating}
        placeholder='Rating (1-5)'
        type="number"
        min="1"
        max="5"
        onChange={(ev) => setRating(Number(ev.target.value))}
      />
      <select
          value={business_id}
          onChange={(ev) => setBusiness_Id(ev.target.value)}
        >
          <option value="" disabled>Select a business</option>
          {businesses?.map((business) => (
            <option key={business.id} value={business.id}> 
              {business.name_full}
            </option>
          ))}
      </select>



      <button>{mode}</button>
    </form>
    </div>
  );
};

export default ReviewForm;