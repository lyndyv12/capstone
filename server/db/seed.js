const { client } = require("./client");
const uuid = require("uuid");

const { createUser, fetchUsers, createBusiness, fetchBusinesses, createReview, fetchReviews } = require("./index.js");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS businesses;


    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE businesses(
      id UUID PRIMARY KEY,
      name_full VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(1056) NOT NULL,
      user_id UUID REFERENCES users(id), 
      business_id UUID REFERENCES businesses(id), 
      rating INT CHECK (rating >= 1 AND rating <= 5)
    );
  `;
  await client.query(SQL);
};

const init = async () => {
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ username: "moe", password: "m_pw" }),
    createUser({ username: "lucy", password: "l_pw" }),
    createUser({ username: "ethyl", password: "e_pw" }),
    createUser({ username: "curly", password: "c_pw" }),
  ]);

  console.log(await fetchUsers());

  const [biz1, biz2, biz3, biz4] = await Promise.all([
    createBusiness({ name_full: "biz1" }),
    createBusiness({ name_full: "biz2" }),
    createBusiness({ name_full: "biz3" }),
    createBusiness({ name_full: "biz4" }),
  ]);

  console.log(await fetchBusinesses());

  const [review1] = await Promise.all([
    createReview({ title: "Great service", description: "they are great. We loved it.", user_id: moe.id , business_id: biz1.id, rating: 4}),
  ]);

  console.log(await fetchReviews());


  client.end();
};

init();
