const { client } = require("./client"); // Make sure the path is correct
const uuid = require("uuid");

const createBusiness = async ({ name_full }) => {
  if (!name_full) {
    const error = Error("full name is required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO businesses(id, name_full) VALUES($1, $2) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), name_full]);
  return response.rows[0];
};

const fetchBusinesses = async () => {
  const SQL = `
    SELECT id, name_full FROM businesses;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = { createBusiness, fetchBusinesses };
