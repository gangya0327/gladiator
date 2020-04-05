const express = require("express");

const router = express.Router();

router.get("/demo", (req, res) => {
  res.end({
    message: "from router demo"
  });
});

module.exports = router;
