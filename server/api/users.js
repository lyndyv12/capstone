const express = require("express");
const router = express.Router();

const { fetchUsers, getUsersReviews, getUsersWithReviewSummary, deleteUser } = require("../db");
const { authMiddleware } = require("./utils");



router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

router.get("/UsersWithReviewSummary", async (req, res, next) => {
  try {
    res.send(await getUsersWithReviewSummary());
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


router.delete("/:id", authMiddleware, async (req, res) => {
  console.log(req)
  const userId = req.params.id;




  try {
    const deletedUser = await deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


module.exports = router;
