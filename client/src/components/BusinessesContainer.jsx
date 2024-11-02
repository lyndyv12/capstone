import React, { useState } from "react";
import BusinessCard from "./BusinessCard";
import { TextField, Select, MenuItem, InputLabel, FormControl, Grid, Typography } from "@mui/material";

function BusinessesContainer({ businesses, auth }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name_full.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || business.business_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const businessTypes = [
    { value: "all", label: "All Types" },
    { value: "restaurant", label: "Restaurant" },
    { value: "bar", label: "Bar" },
    { value: "store", label: "Store" },
    { value: "service", label: "Service" },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Businesses
      </Typography>
      <div style={{ marginBottom: "16px" }}>
        <TextField
          label="Search by business name..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: "16px" }}
        />
        <FormControl variant="outlined" style={{ minWidth: "120px" }}>
          <InputLabel>Business Type</InputLabel>
          <Select value={filterType} onChange={handleFilterChange} label="Business Type">
            {businessTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={2}>
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business) => (
            <Grid item xs={12} sm={6} md={4} key={business.id}>
              <BusinessCard business={business} auth={auth} />
            </Grid>
          ))
        ) : (
          <Typography>No businesses found.</Typography>
        )}
      </Grid>
    </div>
  );
}

export default BusinessesContainer;
