import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Container } from '@mui/material';

function BusinessReviews() {
    const [businessReviews, setBusinessReviews] = useState([]);
    const [loading, setLoading] = useState(true); // To manage loading state
    const { id } = useParams();

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
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        if (id) {
            getBusinessReviews();
        }
    }, [id]);

    return (
        <Container>
            {loading ? (
                <CircularProgress style={{ marginTop: '16px' }} />
            ) : (
                <div>
                    {businessReviews.length > 0 ? (
                        businessReviews.map((review) => (
                            <Card key={review.id} variant="outlined" style={{ margin: '8px 0' }}>
                                <CardContent>
                                    <Typography variant="h6">{review.username}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {review.rating}/5 - {review.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No reviews found.
                        </Typography>
                    )}
                </div>
            )}
        </Container>
    );
}

export default BusinessReviews;