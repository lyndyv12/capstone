const { client } = require("./client");

const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";
if (JWT === "shhh") {
  console.log("If deployed, set process.env.JWT to something other than shhh");
}

const createUser = async ({ username, password, isAdmin }) => {
  if (!username || !password) {
    const error = Error("username and password required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO users(id, username, password, isAdmin) VALUES($1, $2, $3, $4) RETURNING *
  `;
  
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 5),
    isAdmin,
  ]);
  return response.rows[0];
};

const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, username, isAdmin FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

const fetchUsers = async () => {
  const SQL = `
    SELECT id, username FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const getUsersWithReviewSummary = async () => {
  const SQL = `
    SELECT u.id, u.username,COUNT(r.id) AS review_count
    FROM users u
    LEFT JOIN reviews r ON u.id = r.user_id
    GROUP BY u.id;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT * FROM users WHERE username=$1;
  `;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  return { token };
};

module.exports = { createUser, findUserWithToken, fetchUsers, getUsersWithReviewSummary, authenticate };
