const { client } = require("./client");
const uuid = require("uuid");

const createReview = async ({ title, description, user_id, business_id, rating }) => {
  if (!rating || !description || !business_id) {
    const error = Error("rating, description, business_id is required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO reviews(id, title, description, user_id, business_id, rating) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), title, description, user_id, business_id, rating]);
  return response.rows[0];
};

const fetchReviews = async () => {
  const SQL = `
    SELECT id, title, description, user_id, business_id, rating FROM reviews;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const getUsersReviews = async(user_id) => {
  try{
    const SQL = 'SELECT * FROM reviews JOIN users ON reviews.user_id = users.id AND user_id=$1';


    const { rows } = await client.query(SQL, [user_id]);
    if(!rows) 
      return;
    console.log(rows);
    return rows;

  } catch (err) { 
    throw(err)
  }
}

const getBusinessReviews = async (business_id) => {
  try {
    const SQL = `
      SELECT *
      FROM reviews r
      JOIN businesses b ON r.business_id = b.id
      WHERE r.business_id = $1;
    `;
    const { rows } = await client.query(SQL, [business_id]);
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = { createReview, fetchReviews, getUsersReviews, getBusinessReviews };