import React from 'react';
import UserCard from './UserCard';
import './UsersContainer.css';

function UsersContainer({ users }) {
  return (
    <div className="users-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UsersContainer;
