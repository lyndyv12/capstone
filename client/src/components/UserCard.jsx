import { useEffect } from 'react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserReviews from './UserReviews';

function UserCard({ user }) {
    const navigate = useNavigate()

return (
    <div>
        <h3>Name: {user?.username || 'Loading...'} </h3>
        <button onClick={()=> navigate(`/users/${user.id}`)}>See Details</button>
        
    </div>
);
}
  
export default UserCard;