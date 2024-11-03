import { useLocation } from 'react-router-dom';
import { Avatar, Card, CardContent, Box, Typography } from '@mui/material';

function UserDetail() {
  const location = useLocation();
  const userDetails = location.state?.user;

  if (!userDetails) {
    return <div>No user details available.</div>;
  }

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
          <Avatar
            src={userDetails.image_url}
            alt={`${userDetails.first_name || userDetails.username}'s profile`}
            sx={{ width: 150, height: 150, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}
          />
          <Box>
            <Typography variant="h5" component="div">
              {userDetails.first_name} {userDetails.last_name} ({userDetails.username})
            </Typography>
            <Typography variant="body1">City: {userDetails.city}</Typography>
            <Typography variant="body1">State: {userDetails.state}</Typography>
            <Typography variant="body1">Date of Birth: {formatDate(userDetails.date_of_birth)}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserDetail;