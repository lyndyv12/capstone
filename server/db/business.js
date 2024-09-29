const { client } = require("./client");
const uuid = require("uuid");

const createBusiness = async ({ name_full, street_address, city, state, zip, business_type }) => {
  if (!name_full) {
    const error = Error("full name is required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO businesses(id, name_full, street_address, city, state, zip, business_type) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), name_full, street_address, city, state, zip, business_type]);
  return response.rows[0];
};

const fetchBusinesses = async () => {
  const SQL = `
    SELECT id, name_full, street_address, city, state, zip, business_type FROM businesses;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchBusiness = async (id) => {
    const SQL = `
      SELECT * FROM businesses WHERE id=$1;
    `;
    const { rows: [business] }  = await client.query(SQL, [id]);
    console.log("Fetched Business:", business);
    return business;
  };

module.exports = { createBusiness, fetchBusinesses, fetchBusiness };
