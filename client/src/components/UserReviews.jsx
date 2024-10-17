import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserReviews( { UserId }) {
    const [userReviews, setUserReviews] = useState([]);  
    const id = UserId || useParams().id; 


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
          Reviews: {userReviews.length} <br />
          {userReviews.map((review) => (
              <div key={review.id}>
                  <h4>{review.title}</h4>
                  <p>{review.description}</p>
                  <p>Rating: {review.rating}</p>
              </div>
          ))}
        </div>
      );
}

export default UserReviews;