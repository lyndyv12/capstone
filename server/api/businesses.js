const express = require("express");
const router = express.Router();

const { fetchBusinesses, createBusiness, fetchBusiness } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);

        if (req.params.id === " ") {
            next({
              name: "MissingBusinessID",
              message: "A buisness ID must be provided",
            });
            return;}

        const result = await fetchBusiness(id);
        if (!result) {
            next({ name: "Not Found", message: "No matching business found" });
            return;
          }
        res.send(result);
        }catch (ex) {
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
