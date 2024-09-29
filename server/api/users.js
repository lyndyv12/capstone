const express = require("express");
const router = express.Router();

const { fetchUsers, getUsersReviews } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id/reviews", async (req, res, next) => {
  try {
      const id = req.params.id;
  
      const result = await getUsersReviews(id);
    
      res.send(result);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
