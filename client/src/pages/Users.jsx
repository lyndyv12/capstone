import React from 'react';
import UsersContainer from "../components/UsersContainer";
import { Container } from '@mui/material'; 
import './Users.css';

const Users = ({ users }) => {
  return (
    <Container className="users-container">
      <h1 className="users-title">Users ({users.length})</h1>
      <UsersContainer users={users} />
    </Container>
  );
};

export default Users;

