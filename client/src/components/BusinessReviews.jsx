import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BusinessReviews() {
    const [businessReviews, setBusinessReviews] = useState([]); 
    const { id } = useParams()  

    useEffect(() => {  
        console.log("Fetched business ID:", id);

        const getBusinessReviews = async () => {
            try {
                const response = await fetch(`/api/businesses/${id}/reviews`);
                const data = await response.json();
                console.log("Fetched business reviews:", data);
                setBusinessReviews(data);
            } catch (error) {
                console.error("Error fetching business reviews:", error);
            }
        };

        if (id) {
            getBusinessReviews(); 
        }
    }, [id]);


 

    return (
      <div>
        {businessReviews.map((review) => (
            <div key={review.id}>
                <h5>{review.username}</h5>
                <p>{review.rating}/5 - {review.description}</p>
            </div>
        ))}
      </div>
    );
}

export default BusinessReviews;