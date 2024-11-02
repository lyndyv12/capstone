import React from 'react';
import { Container, Typography, Link as MUILink, Box } from '@mui/material';
import AuthForm from "../components/AuthForm/AuthForm";

const Home = ({ auth, authAction, businesses, users, reviews }) => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Welcome to Our Business Review Site
      </Typography>
      <Typography variant="body1" paragraph>
        Explore the best businesses in our community!
      </Typography>

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          Site Statistics
        </Typography>
        <Typography variant="body1">
          We have <strong>{businesses.length}</strong> amazing businesses listed.
          <br />
          Join <strong>{users.length}</strong> other users sharing their experiences.
          <br />
          Together, we have written <strong>{reviews.length}</strong> reviews.
        </Typography>
      </Box>

      {/* Only show the AuthForm if the user is not authenticated */}
      {!auth.id && (
        <Box mt={4}>
          <Typography variant="h2" gutterBottom>
            Login
          </Typography>
          <AuthForm authAction={authAction} mode="login" />
        </Box>
      )}

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          Quick Links
        </Typography>
        <MUILink href="/businesses" variant="body1" display="block" sx={{ mb: 1 }}>
          View Businesses
        </MUILink>
        <MUILink href="/createReview" variant="body1" display="block" sx={{ mb: 1 }}>
          Write a Review
        </MUILink>
        <MUILink href="/users" variant="body1" display="block">
          View Users
        </MUILink>
      </Box>
    </Container>
  );
}

export default Home;