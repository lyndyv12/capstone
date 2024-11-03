import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import BusinessDetail from "./pages/BusinessDetail";
import UserReviews from "./components/UserReviews";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import UserCard from "./components/UserCard";
import UserDetails from "./pages/UserDetails";

function App() {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [refreshReviews, setRefreshReviews] = useState(false);

  useEffect(() => {
    attemptLoginWithToken();
    getUsers();
    getBusinesses();
    getReviews();
  }, [refreshReviews]);

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await fetch(`/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  };

  const authAction = async (credentials, mode) => {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
      if (mode === 'register') {
        getUsers(); 
      }
    } else {
      throw json;
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch("/api/users/UsersWithReviewSummary");
      const data = await response.json();
      setUsers(data); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getBusinesses = async () => {
    try {
      const response = await fetch("/api/businesses");
      const data = await response.json();
      setBusinesses(data); 
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  const getReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data); 
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const reviewFormAction = async (reviewData) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": window.localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        const json = await response.json();
        throw json; // Handle error
      }

      setRefreshReviews(true); // Trigger a refresh of reviews
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  console.log(auth)

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Business Review App
          </Typography>
          <Link to="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/businesses">
            <Button color="inherit">Businesses</Button>
          </Link>
          <Link to="/users">
            <Button color="inherit">Users</Button>
          </Link>
          {auth.isadmin && (
            <Link to="/admin">
              <Button color="inherit">Admin</Button>
            </Link>
          )}
          {auth.id ? (
            <Button onClick={() => {
              window.localStorage.removeItem("token");
              setAuth({});}} 
              color="inherit">
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home auth={auth} authAction={authAction} businesses={businesses} users={users} reviews={reviews} />} />
        <Route path="/businesses" element={<Businesses businesses={businesses} />} />
        <Route path="/createReview/:businessId" element={<CreateReview auth={auth} authAction={authAction} reviewFormAction={reviewFormAction} setRefreshReviews={setRefreshReviews} businesses={businesses} />} />
        <Route path="/businesses/:id" element={<BusinessDetail />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetails users={users} />} />
        <Route path="/account" element={<Account auth={auth} />} />
        <Route path="/admin" element={<Admin auth={auth} users={users} businesses={businesses}/>} />
        <Route path="/login" element={<Login authAction={authAction} />} /> 
        <Route path="/register" element={<Register authAction={authAction} />} />
      </Routes>
    </div>
  );
}

export default App;