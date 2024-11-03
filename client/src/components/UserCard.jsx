import React from 'react';
import { Card, CardContent, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserCard({ user, auth }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/users/${user.id}`, { state: { user } });
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: 'pointer',
        maxWidth: 345,
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <CardContent>
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

        {auth?.isadmin && (
          <div style={{ marginTop: '1rem' }}>
            <Typography variant="body2" color="text.secondary">
              Is an admin: {String(user.isadmin)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user.email || 'No Email Provided'}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default UserCard;
