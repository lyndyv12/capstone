const express = require("express");
const router = express.Router();

const { fetchReviews, createReview, editReview, deleteReview } = require("../db");

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


router.put("/:review_id", async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { description, rating } = req.body;
    
    const updatedReview = await editReview({ review_id, description, rating });
    res.send(updatedReview);
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:review_id", async (req, res, next) => {
  try {
    const { review_id } = req.params;
    
    const deletedReview = await deleteReview(review_id);
    res.send(deletedReview);
  } catch (ex) {
    next(ex);
  }
});





module.exports = router;