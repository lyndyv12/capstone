import React from 'react'

function BusinessCard( { business }) {
    console.log(business);
  return (
    <div>
        <h3>Name: {business?.name_full} </h3> 
        <button>See Details</button>

    </div>
  )
}

export default BusinessCard