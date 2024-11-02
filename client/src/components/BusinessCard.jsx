import React from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './BusinessCard.css'; // Import your CSS file

function BusinessCard({ business, auth }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        {business?.image_url && (
          <img 
            src={business.image_url} 
            alt={business.name_full} 
            className="business-image" 
          />
        )}
        <Typography variant="h5">
          Name: {business?.name_full || "Loading..."}
        </Typography>
        <Typography color="textSecondary">
          Type: {business?.business_type}<br />
          Review Count: {business?.review_count}<br />
          Rating: {business?.review_avgrating}<br />
          Address: {business?.street_address}
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