import { useLocation } from 'react-router-dom';


function UserDetail() {
    const location = useLocation(); 
    const userDetails = location.state?.user; 
  
    if (!userDetails) {
      return <div>No user details available.</div>; 
    }
  
    return (
      <div>
        <h1>{userDetails.username}</h1>
        <img src={userDetails.image_url} alt={`${userDetails.username}'s avatar`} />
        <p>Date of Birth: {userDetails.date_of_birth}</p>
        {/* Add any other user details you want to display */}
      </div>
    );
  }
  
  export default UserDetail;