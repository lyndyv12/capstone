import React from 'react';
import AuthForm from "../components/AuthForm/AuthForm";
import { Link } from 'react-router-dom';

const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  return (
    <div>
      <h1>Welcome to Our Business Review Site</h1>
      <p>
        Explore the best businesses in our community! 
      </p>

      <div>
        <h2>Site Statistics</h2>
        <p>
          We have <strong>{businesses.length}</strong> amazing businesses listed.
          <br />
          Join <strong>{users.length}</strong> other users sharing their experiences.
          <br />
          Together, we have written <strong>{reviews.length}</strong> reviews.
        </p>
      </div>

      

      <div style={{ marginTop: '20px' }}>
        <h2>Login or Register</h2>
        <AuthForm authAction={authAction} mode="login" />
        <AuthForm authAction={authAction} mode="register" />
      </div>

      <div>
        <h2>Quick Links</h2>
        <Link to="/businesses" style={{ margin: '10px', textDecoration: 'none', color: 'blue' }}>View Businesses</Link>
        <Link to="/createReview" style={{ margin: '10px', textDecoration: 'none', color: 'blue' }}>Write a Review</Link>
        <Link to="/users" style={{ margin: '10px', textDecoration: 'none', color: 'blue' }}>View Users</Link>
      </div>
      
    </div>

  )}

export default Home;
