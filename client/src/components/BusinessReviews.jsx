import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Container, Alert } from '@mui/material';
import './BusinessReviews.css';

function BusinessReviews() {
    const [businessReviews, setBusinessReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getBusinessReviews = async () => {
            try {
                const response = await fetch(`/api/businesses/${id}/reviews`);
                if (!response.ok) {
                    throw new Error("Failed to fetch reviews");
                }
                const data = await response.json();
                setBusinessReviews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getBusinessReviews();
        }
    }, [id]);

    return (
        <Container>
            {loading ? (
                <CircularProgress className="loading-spinner" />
            ) : error ? (
                <Alert severity="error" className="error-alert">
                    {error}
                </Alert>
            ) : (
                <div>
                    {businessReviews.length > 0 ? (
                        businessReviews.map((review) => (
                            <Card key={review.id} variant="outlined" className="review-card">
                                <CardContent>
                                    <Typography variant="h5" color="text.primary" className="review-title">
                                        {review.title}
                                    </Typography>
                                    <Typography variant="h6">Author: {review.username}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {review.rating}/5 - {review.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" color="text.secondary" className="no-reviews">
                            No reviews found.
                        </Typography>
                    )}
                </div>
            )}
        </Container>
    );
}

export default BusinessReviews;