import React from 'react'
import BusinessCard from './BusinessCard'

function BusinessesContainer({ businesses }) {
    console.log(businesses)
  return (
    <div>
        {businesses.map((business)=>(
            <BusinessCard key={business.id} business={business} />
        ))}
    </div>
  )
}

export default BusinessesContainer