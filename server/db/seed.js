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
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT false
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
      image_url VARCHAR(1024),
  
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
      rating INT CHECK (rating >= 1 AND rating <= 5),
      UNIQUE (user_id, business_id)
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
    createUser({ username: "moe", password: "m_pw", isAdmin: true }),
    createUser({ username: "lucy", password: "l_pw", isAdmin: false }),
    createUser({ username: "ethyl", password: "e_pw", isAdmin: false }),
    createUser({ username: "curly", password: "c_pw", isAdmin: false }),
  ]);

  console.log(await fetchUsers());

  const [biz1, biz2, biz3, biz4, biz5, biz6, biz7] = await Promise.all([
    createBusiness({ 
      name_full: "Sunset Bistro", 
      street_address: "5019 Venetian Way", 
      city: "Versailles", 
      state: "Kentucky", 
      zip: "40383", 
      business_type: "Restaurant",
      price_range: "$$",
      image_url: "https://www.marketplace.virginia.gov/sites/default/files/2023-10/AdobeStock_415962919.jpeg",
    
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
      image_url: "https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2022/10/Business_Ideas_For_Women_-_article_image.jpg",
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
      image_url: "https://media.licdn.com/dms/image/D4E12AQGjhxH5IKNAJw/article-cover_image-shrink_720_1280/0/1677123037147?e=2147483647&v=beta&t=R0I7ziUjyIpeCALJka44wOAj9rG9mP_VA45xD7ItJH8",
    
      hasKidsSeating: false, 
      hasChangingStation: false,
      
    }),
    createBusiness({ 
      name_full: "Tuck's Place", 
      street_address: "5019 Venetian Way", 
      city: "Versailles", 
      state: "Kentucky", 
      zip: "40383", 
      business_type: "Restaurant",
      price_range: "$",
      image_url: "https://www.bankrate.com/2022/09/23150659/Small-businesses-by-the-numbers.jpg?auto=webp&optimize=high&crop=16:9",
    
      hasKidsSeating: true, 
      hasChangingStation: true,
      
      features: {
        kidsSeatingOptions: ['High Chairs'], 
        changingStationLocations: ['Womens Restroom']
      }
    }),
    createBusiness({ 
      name_full: "Tuck's FastFood", 
      street_address: "5019 Venetian Way", 
      city: "Versailles", 
      state: "Kentucky", 
      zip: "40383", 
      business_type: "Restaurant",
      price_range: "$",
      image_url: "https://www.uschamber.com/assets/images/GettyImages-1003743930-Small-Business-AI-Tools.jpg",
    
      hasKidsSeating: false, 
      hasChangingStation: false,
      
    }),
    createBusiness({ 
      name_full: "Zach's Beach Bar", 
      street_address: "5019 Venetian Way", 
      city: "Versailles", 
      state: "Kentucky", 
      zip: "40383", 
      business_type: "Bar",
      price_range: "$$$$",
      image_url: "https://www.answerfinancial.com/insurance-center/wp-content/uploads/2021/04/commercial_insurance_for_small_business_owners.jpg",
    
      hasKidsSeating: false, 
      hasChangingStation: false,
      
    }),
    createBusiness({ 
      name_full: "Last but not least", 
      street_address: "5019 Venetian Way", 
      city: "Versailles", 
      state: "Kentucky", 
      zip: "40383", 
      business_type: "Bar",
      price_range: "$$$$",
      image_url: "https://media.smallbiztrends.com/2021/11/how-to-support-small-business-.png",
    
      hasKidsSeating: false, 
      hasChangingStation: false,
      
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
      business_id: biz2.id, 
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
