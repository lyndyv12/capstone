import { useEffect } from 'react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function BusinessCard({ business }) {

    const navigate = useNavigate();

return (
    <div>
        <h3>Name: {business?.name_full || 'Loading...'} </h3>
            <h4> {business?.business_type}<br />
            Review Count:{business?.review_count}<br />
            Rating:{business?.review_avgrating}<br />
            {business?.street_address} </h4> 
        <button onClick={()=> navigate(`/businesses/${business.id}`)}>See Details</button>
    </div>
);
}
  
export default BusinessCard;