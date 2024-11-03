import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Container,
    Alert,
    IconButton,
    Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
            <h1>Reviews</h1>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <div>
                    {businessReviews.length > 0 ? (
                        businessReviews.map((review) => (
                            <Card key={review.id} variant="outlined" sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h5">{review.title}</Typography>
                                    <Typography variant="subtitle1">Author: {review.username}</Typography>
                                    <Typography variant="body2">{review.rating}/5</Typography>

                                    {/* Short description */}
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {review.description.length > 100
                                            ? review.description.substring(0, 100) + '...'
                                            : review.description}
                                    </Typography>

                                    {/* Expand button */}
                                    {review.description.length > 100 && (
                                        <>
                                            <IconButton onClick={() => (review.isExpanded = !review.isExpanded)}>
                                                <ExpandMoreIcon />
                                            </IconButton>
                                            <Collapse in={review.isExpanded} timeout="auto" unmountOnExit>
                                                <Typography variant="body2">{review.description}</Typography>
                                            </Collapse>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No reviews found.</Typography>
                    )}
                </div>
            )}
        </Container>
    );
}

export default BusinessReviews;
