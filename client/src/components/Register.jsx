import React from 'react';
import { Container, Typography } from '@mui/material';
import AuthForm from '../components/AuthForm/AuthForm';

const Register = ({ authAction }) => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Register
      </Typography>
      <AuthForm authAction={authAction} mode="register" />
    </Container>
  );
};

export default Register;