const { client } = require("./client");
const uuid = require("uuid");

const createBusiness = async ({ 
  name_full, street_address, city, state, zip, business_type, price_range, hasKidsSeating, hasChangingStation, features 
}) => {
  if (!name_full) {
    const error = Error("full name is required!");
    error.status = 401;
    throw error;
  }

  const SQL = `
    INSERT INTO businesses(id, name_full, street_address, city, state, zip, business_type, price_range, hasKidsSeating, hasChangingStation, features) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    RETURNING *;
  `;

  const response = await client.query(SQL, [
    uuid.v4(),
    name_full,
    street_address,
    city,
    state,
    zip,
    business_type,
    price_range,
    hasKidsSeating,
    hasChangingStation,
    features
  ]);

  return response.rows[0];
};


const fetchBusinesses = async () => {
  const SQL = `
    SELECT 
      b.*, 
      COUNT(r.id) AS review_count, 
      AVG(r.rating) AS review_avgrating
    FROM businesses b
    LEFT JOIN reviews r ON b.id = r.business_id
    GROUP BY b.id;
  `;
  const response = await client.query(SQL);
  return response.rows;
};


const fetchBusiness = async (id) => {
  const SQL = `
    SELECT 
      b.*, 
      COUNT(r.id) AS review_count, 
      AVG(r.rating) AS review_avgrating
    FROM businesses b
    LEFT JOIN reviews r ON b.id = r.business_id
    WHERE b.id = $1  -- 'b.id' for businesses table
    GROUP BY b.id;
  `;
    const { rows: [business] }  = await client.query(SQL, [id]);
    console.log("Fetched Business:", business);
    return business;
  };


module.exports = { createBusiness, fetchBusinesses, fetchBusiness };
