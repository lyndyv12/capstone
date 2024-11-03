import React from 'react';
import { Button, Card, CardContent, Avatar } from '@mui/material'; // MUI components
import { useNavigate } from 'react-router-dom';
import './UserCard.css';

function UserCard({ user, auth }) {
  const navigate = useNavigate();

  return (
    <Card className="user-card">
      <CardContent>
        <Avatar 
          src={user.image_url} 
          alt={`${user.first_name || user.username}'s profile`}
          className="user-avatar"
        />

        <h2>{user.username || 'Loading...'}</h2>
        <p>Reviews: {user.review_count || 'Loading...'}</p>

        <Button
          className="user-button"
          variant="contained"
          color="primary"
          onClick={() => navigate(`/users/${user.id}`, { state: { user } })}
        >
          See Details
        </Button>

        {auth?.isadmin && (
          <div className="admin-section">
            <p className="admin-info">Is an admin: {String(user.isadmin)}</p>
            <p className="admin-info">Email: {user.email || 'No Email Provided'}</p>
            <Button variant="outlined" color="secondary">
              Delete {user.username}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default UserCard;