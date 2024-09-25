import { useState, useEffect } from 'react';

const ReviewForm = ({ mode = 'create', businesses }) => { 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user_id, setUser_Id] = useState('');
  const [business_id, setBusiness_Id] = useState('');
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

    const json = await response.json();
    console.log(json);
  };

  const submit = async (ev) => {
    ev.preventDefault();
    try {
      await reviewFormAction({ title, description, user_id, business_id, rating }, mode);
    } catch (ex) {
      setError(ex.error);
      console.log(error);
    }
  };

  return (
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
        onChange={(ev) => setRating(ev.target.value)}
      />
      <input
        value={user_id}
        placeholder='User ID'
        onChange={(ev) => setUser_Id(ev.target.value)}
      />
      <select
        value={business_id}
        onChange={(ev) => setBusiness_Id(ev.target.value)}>
            {businesses?.map((business) => <option key={business.id} value={business.name_full}> 
                {business.name_full}
            </option>)}
      </select>



      <button>{mode}</button>
    </form>
  );
};

export default ReviewForm;