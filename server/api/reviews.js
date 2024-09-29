const express = require("express");
const router = express.Router();

const { fetchReviews, createReview } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchReviews());
  } catch (ex) {
    next(ex);
  }
});



  router.post("/create", async (req, res, next) => {
    try {
      res.send(await createReview(req.body));
    } catch (ex) {
      next(ex);
    }
  });

module.exports = router;