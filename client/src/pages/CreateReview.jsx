import AuthForm from "../components/AuthForm/AuthForm";
import ReviewForm from "../components/ReviewForm";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper } from '@mui/material';

const CreateReview = ({ auth, authAction, reviewFormAction, setRefreshReviews, businesses }) => {
  const { businessId } = useParams();

  return (
    <Box sx={{ padding: 2 }}>
      {auth.id ? (
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Create a Review for Your Business
          </Typography>
          <ReviewForm 
            reviewFormAction={reviewFormAction} 
            authId={auth.id}
            setRefreshReviews={setRefreshReviews} 
            businessId={businessId}
            businesses={businesses} 
            mode="create" 
          />
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            You must first login to create a review
          </Typography>
          <AuthForm authAction={authAction} mode="login" />
        </Paper>
      )}
    </Box>
  );
};

export default CreateReview;
