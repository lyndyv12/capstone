const express = require("express");
const router = express.Router();

const { fetchReviews } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchReviews());
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;