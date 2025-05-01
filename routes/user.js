const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload")

router.post("/signup", async (req, res) => {
  console.log((req));
  
  res.status(200).json({
    msg: "Signup",
  });
});

module.exports = router;
