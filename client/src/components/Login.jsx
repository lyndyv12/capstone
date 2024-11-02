import React from 'react';
import { Container, Typography } from '@mui/material';
import AuthForm from '../components/AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';

const Login = ({ authAction }) => {
  const navigate = useNavigate(); 

  const handleAuthSuccess = () => {
    navigate('/'); 
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Login
      </Typography>
      <AuthForm authAction={authAction} mode="login" onSuccess={handleAuthSuccess} />
    </Container>
  );
};

export default Login;