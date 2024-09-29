import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import BusinessDetail from "./components/BusinessDetail";
import BusinessCard from "./components/BusinessCard";
import UserReviews from "./components/UserReviews";

function App() {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    attemptLoginWithToken();
    getUsers();
    getBusinesses();
    getReviews();
  }, []);

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
    } else {
      throw json;
    }
  };

  const getUsers = async () => {
    console.log("getUsers function called"); 
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getBusinesses = async () => {
    console.log("getBusinesses function called"); 
    try {
      const response = await fetch("/api/businesses");
      const data = await response.json();
      setBusinesses(data); 
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  const getReviews = async () => {
    console.log("getReviews function called"); 
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data); 
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };


  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <>
      <h1>Acme Business Reviews</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/businesses">Businesses ({businesses.length})</Link>
        <Link to="/users">Users ({users.length})</Link>
        {auth.id ? (
          <Link to="/createReview">Create Review</Link>
        ) : (
          <Link to="/">Register/Login</Link>
        )}
      </nav>
      {auth.id && <button onClick={logout}>Logout {auth.username}</button>}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
              reviews={reviews}
            />
          }
        />
        <Route
          path="/businesses"
          element={
            <Businesses 
              businesses={businesses}
              auth={auth} 
            />
          }
        />
        <Route 
          path="/businesses/:id" 
          element={
            <BusinessCard />
          } 
        />

        <Route 
          path="/businesses/:id/details" 
          element={
            <BusinessDetail />
          } 
        />


        <Route path="/users" 
          element={<Users users={users} />} 
        />

        <Route path="/users/:id" 
          element={<UserReviews users={users} />} 
        />

        {!!auth.id && <Route path="/createReview" 
          element={<CreateReview 
            auth={auth}
            businesses={businesses}
          />} 
        />}
      </Routes>
    </>
  );
}

export default App;
