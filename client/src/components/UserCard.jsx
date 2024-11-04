import React from 'react';
import { Button, Card, CardContent, CardActions, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserCard({ user, auth }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/users/${user.id}`, { state: { user } });
  };

  function handleDeleteClick(userId) {
    
    const token = window.localStorage.getItem("token"); 
  
    fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete user'); 
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message); 
      // Optionally, update state or redirect as needed after deletion
    })
    .catch((error) => {
      console.error(error.message); 
    });
  }

  return (
    <Card
      sx={{
        cursor: 'pointer',
        maxWidth: 345,
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <CardContent onClick={handleCardClick}>
        <Avatar 
          src={user.image_url} 
          alt={`${user.first_name || user.username}'s profile`}
          sx={{ width: 56, height: 56, mb: 2 }}
        />

        <Typography variant="h6">
          {user.username || 'Loading...'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reviews: {user.review_count || 'Loading...'}
        </Typography>
      </CardContent>
      {auth?.isadmin && (
          <div>
            <CardActions>
              <Button variant="outlined" onClick={() => handleDeleteClick(user.id)}>
                Delete User
              </Button>
            </CardActions>
            <Typography variant="body2" color="text.secondary">
              Is an admin: {String(user.isadmin)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user.email || 'No Email Provided'}
            </Typography>
          </div>
        )}
    </Card>
  );
}

export default UserCard;
