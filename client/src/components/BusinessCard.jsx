import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BusinessCard({ business, auth }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/businesses/${business.id}`);
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        maxWidth: 345,
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
        mb: 2, 
      }}
    >
      <CardContent onClick={handleCardClick}>
        {business?.image_url ? (
          <Avatar
            src={business.image_url}
            alt={business.name_full}
            sx={{ width: 56, height: 56, mb: 2 }}
          />
        ) : (
          <Avatar sx={{ width: 56, height: 56, mb: 2 }}>B</Avatar>
        )}
        <Typography variant="h6">
          {business?.name_full || "Loading..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {business?.business_type || "N/A"}<br />
          Review Count: {business?.review_count || 0}<br />
          Rating: {business?.review_avgrating || "N/A"}<br />
          Address: {business?.street_address || "N/A"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/businesses/${business.id}`)}>
          See Details
        </Button>
        <Button size="small" onClick={() => navigate(`/createReview/${business.id}`)}>
          Create Review
        </Button>
      </CardActions>
    </Card>
  );
}

export default BusinessCard;