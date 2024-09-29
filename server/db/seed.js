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
      name_full VARCHAR(255) NOT NULL,
      street_address VARCHAR(255) NOT NULL,
      city VARCHAR(64) NOT NULL,
      state VARCHAR(64) NOT NULL,
      zip VARCHAR(64) NOT NULL,
      business_type VARCHAR(64) NOT NULL,
      price_range VARCHAR(5) CHECK (price_range IN ('$','$$','$$$','$$$$')),
  
      -- Boolean flags for major feature categories
      hasKidsSeating BOOLEAN DEFAULT false,
      hasChangingStation BOOLEAN DEFAULT false,
  
      -- Additional details stored in JSONB
      features JSONB DEFAULT '{}'
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
    createBusiness({ 
      name_full: "Sunset Bistro", 
      street_address: "5019 Venetian Way", 
      city: "Versailles", 
      state: "Kentucky", 
      zip: "40383", 
      business_type: "Fast Casual Restaurant",
      price_range: "$$",
    
      hasKidsSeating: true, 
      hasChangingStation: true,
      
      features: {
        kidsSeatingOptions: ['High Chairs', 'Booster Seats'], 
        changingStationLocations: ['Mens Restroom', 'Womens Restroom']
      }
    }),
    createBusiness({ 
      name_full: "Lyndy's Pub", 
      street_address: "108 Spring Run Street", 
      city: "Versailles", 
      state: "Kentucky", 
      zip: "40383", 
      business_type: "Bar",
      price_range: "$",
      hasKidsSeating: false,
      hasChangingStation: true,
      features: {
        changingStationLocations: ['Womens Restroom']
      }
    }),
    createBusiness({ 
      name_full: "Zach's Cocktail Bar", 
      street_address: "5019 Venetian Way", 
      city: "Versailles", 
      state: "Kentucky", 
      zip: "40383", 
      business_type: "Bar",
      price_range: "$$$$",
    
      hasKidsSeating: false, 
      hasChangingStation: false,
      
    }),
    createBusiness({ 
      name_full: "Tuck's Place", 
      street_address: "5019 Venetian Way", 
      city: "Versailles", 
      state: "Kentucky", 
      zip: "40383", 
      business_type: "Fast Casual Restaurant",
      price_range: "$",
    
      hasKidsSeating: true, 
      hasChangingStation: true,
      
      features: {
        kidsSeatingOptions: ['High Chairs'], 
        changingStationLocations: ['Womens Restroom']
      }
    }),
  ]);

  console.log(await fetchBusinesses());

  const [review1, review2, review3] = await Promise.all([
    createReview({ 
      title: "super kid friendly", 
      description: "they are great. We loved it.", 
      user_id: moe.id, 
      business_id: biz1.id, 
      rating: 1
    }),
    createReview({ 
      title: "don't bring kids here", 
      description: "they are great. We loved it.", 
      user_id: moe.id, 
      business_id: biz1.id, 
      rating: 4
    }),
    createReview({ 
      title: "Best restuarant ever for kids", 
      description: "they are great. We loved it.", 
      user_id: lucy.id, 
      business_id: biz2.id, 
      rating: 4
    }),
  ]);

  console.log(await fetchReviews());


  client.end();
};

init();
