import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserReviews() {
    const [userReviews, setUserReviews] = useState({});  
    const id = useParams().id; 


    useEffect(() => {  
        console.log("Fetched user ID:", id);

        const getUserReviews = async () => {
            try {
                const response = await fetch(`/api/users/${id}/reviews`);
                const data = await response.json();

                setUserReviews(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (id) {
            getUserReviews(); 
        }
    }, [id]); 


 

    return (
      <div>
        Reviews: {userReviews.length} <br></br>
        Map over and Display some interesting Review Card here
      </div>
    );
}

export default UserReviews;