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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function BusinessReviews() {
    const [businessReviews, setBusinessReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);

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

    const shortDescription = (description) => {
        return description.length > 200
            ? description.substring(0, 200) + '...'
            : description;
    };

    const toggleExpand = (index) => {
        setExpandedReviewIndex(expandedReviewIndex === index ? null : index);
    };

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
                        businessReviews.map((review, index) => (
                            <Card key={review.id} variant="outlined" sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h5">{review.title}</Typography>
                                    <Typography variant="subtitle1">Author: {review.username}</Typography>
                                    <Typography variant="body2">{review.rating}/5</Typography>

                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {expandedReviewIndex === index ? review.description : shortDescription(review.description)}
                                    </Typography>
                                    
                                    {review.description.length > 200 && (
                                        <IconButton onClick={() => toggleExpand(index)}>
                                            <ExpandMoreIcon />
                                        </IconButton>
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