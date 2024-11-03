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
      isAdmin BOOLEAN DEFAULT false,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      image_url VARCHAR(1024),
      city VARCHAR(64),
      state VARCHAR(64),
      date_of_birth DATE
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
    createUser({ username: "moe", password: "m_pw", isAdmin: true, first_name: "Moe", last_name: "Howard", image_url: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg", city: "Springfield", state: "IL", date_of_birth: "1900-06-19" }),
    createUser({ username: "lucy", password: "l_pw", isAdmin: false, first_name: "Lucy", last_name: "Ricardo", image_url: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid", city: "New York", state: "NY", date_of_birth: "1921-08-06" }),
    createUser({ username: "ethyl", password: "e_pw", isAdmin: false, first_name: "Ethyl", last_name: "Mertz", image_url: "https://img.freepik.com/free-vector/woman-with-braided-hair-illustration_1308-174675.jpg?t=st=1730651810~exp=1730655410~hmac=14ffe7e3771a0506cf9e07334b36eaec57a00fffc30e664249477d00ce5d5f82&w=826", city: "Albuquerque", state: "NM", date_of_birth: "1915-11-02" }),
    createUser({ username: "curly", password: "c_pw", isAdmin: false, first_name: "Curly", last_name: "Howard", image_url: "https://img.freepik.com/free-vector/smiling-woman-with-red-hair_1308-174444.jpg?t=st=1730651834~exp=1730655434~hmac=c0251f2c53f77a59a2328fca2c5adf57371d96e29fafbd904e211eed595cfa05&w=740", city: "Los Angeles", state: "CA", date_of_birth: "1903-10-22" }),
    createUser({ username: "larry", password: "l_pw", isAdmin: false, first_name: "Larry", last_name: "Fine", image_url: "https://img.freepik.com/free-vector/young-man-with-glasses-illustration_1308-174706.jpg?t=st=1730652647~exp=1730656247~hmac=0dd2657fb53054c6de7c031fce80cf1ee9cf10fcaf88520d49130cb4bd737c65&w=900", city: "Philadelphia", state: "PA", date_of_birth: "1902-10-05" }),
    createUser({ username: "shirley", password: "s_pw", isAdmin: false, first_name: "Shirley", last_name: "Feeney", image_url: "https://img.freepik.com/free-vector/woman-with-long-red-hair_1308-174371.jpg?t=st=1730651860~exp=1730655460~hmac=6d24d0330f7b71cea3f18164dc8f1ba968e4257c1e374d9e9bfcf9273ebe26dd&w=826", city: "Milwaukee", state: "WI", date_of_birth: "1950-01-22" }),
    createUser({ username: "laverne", password: "lav_pw", isAdmin: false, first_name: "Laverne", last_name: "DeFazio", image_url: "https://img.freepik.com/free-vector/confident-woman-with-short-hair_1308-175918.jpg?t=st=1730651898~exp=1730655498~hmac=234d6a5aa612c481d034f20a762807014a92aa98ea3f97efb2e836a024dc4781&w=900", city: "Milwaukee", state: "WI", date_of_birth: "1951-03-17" }),
    createUser({ username: "ralph", password: "ralph_pw", isAdmin: false, first_name: "Ralph", last_name: "Kramden", image_url: "https://img.freepik.com/free-vector/young-man-traditional-attire_1308-175854.jpg?t=st=1730652542~exp=1730656142~hmac=a6e9a2ca8a2908a8d86ab788721f9be2d66c987eb7e15cafcfdb9fa13a85f35f&w=996", city: "Brooklyn", state: "NY", date_of_birth: "1910-09-23" }),
    createUser({ username: "ed", password: "ed_pw", isAdmin: false, first_name: "Ed", last_name: "Norton", image_url: "https://img.freepik.com/free-vector/smiling-woman-with-braided-hair_1308-175716.jpg?t=st=1730651921~exp=1730655521~hmac=16aff40f49cbec95e60dc995520bf3efccff53e56cf0bfe7c664f61bc4dd442e&w=740", city: "Brooklyn", state: "NY", date_of_birth: "1915-08-15" }),
    createUser({ username: "fred", password: "fred_pw", isAdmin: false, first_name: "Fred", last_name: "Flintstone", image_url: "https://img.freepik.com/free-vector/young-prince-traditional-attire_1308-174397.jpg?t=st=1730651952~exp=1730655552~hmac=d3ee2634783a6cc449c45b2cbe9a32c64daaafa718240f76468b6d0bdb86268c&w=996", city: "Bedrock", state: "ZZ", date_of_birth: "1960-05-01" })
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
      description: "they are great. We loved it. Here is a really really really long review. Here is a really really really long review. Here is a really really really long review. Here is a really really really long review. Here is a really really really long review. Here is a really really really long review. Here is a really really really long review. Here is a really really really long review. Here is a really really really long review. ", 
      user_id: lucy.id, 
      business_id: biz2.id, 
      rating: 4
    }),
  ]);

  console.log(await fetchReviews());


  client.end();
};

init();
