const express = require("express");
const router = express.Router();

const { fetchBusinesses, createBusiness } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

router.post("/create", async (req, res, next) => {
    try {
      res.send(await createBusiness(req.body));
    } catch (ex) {
      next(ex);
    }
  });

module.exports = router;
