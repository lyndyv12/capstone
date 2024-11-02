import React from 'react';
import { Button, Card, CardContent } from '@mui/material'; // MUI components
import { useNavigate } from 'react-router-dom';
import './UserCard.css';

function UserCard({ user, auth }) {
  const navigate = useNavigate();

  return (
    <Card className="user-card">
      <CardContent>
        <h3>Name: {user?.username || 'Loading...'}</h3>
        <p>Reviews: {user?.review_count || 'Loading...'}</p>
        <Button
          className="user-button"
          variant="contained"
          color="primary"
          onClick={() => navigate(`/users/${user.id}`)}
        >
          See Details
        </Button>

        {auth?.isadmin && (
          <div className="admin-section">
            <p className="admin-info">Is an admin: {String(user.isadmin)}</p>
            <p className="admin-info">Email: {user?.email}</p>
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
