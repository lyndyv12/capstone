import React from 'react';
import { Container, Typography } from '@mui/material';
import AuthForm from '../components/AuthForm/AuthForm';

const Login = ({ authAction }) => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Login
      </Typography>
      <AuthForm authAction={authAction} mode="login" />
    </Container>
  );
};

export default Login;