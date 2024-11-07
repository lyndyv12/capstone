const { findUserWithToken } = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await findUserWithToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message || "Unauthorized access" });
  }
};

module.exports = { isLoggedIn, authMiddleware };
