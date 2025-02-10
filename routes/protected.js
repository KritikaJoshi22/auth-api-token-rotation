const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: {
      username: req.user.username,
      token: req.user.token,
    },
  });
});

module.exports = router;
