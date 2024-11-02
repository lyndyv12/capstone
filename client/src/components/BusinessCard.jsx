import React from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BusinessCard({ business, auth }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
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
