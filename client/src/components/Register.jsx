import React from 'react';
import { Container, Typography } from '@mui/material';
import AuthForm from '../components/AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom'; 

const Register = ({ authAction }) => {
  const navigate = useNavigate(); 

  const handleAuthSuccess = () => {
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Register
      </Typography>
      <AuthForm authAction={authAction} mode="register" onSuccess={handleAuthSuccess} />
    </Container>
  );
};

export default Register;