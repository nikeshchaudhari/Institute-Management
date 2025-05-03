const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

require('dotenv').config()


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/signup", async (req, res) => {
 try{
const uploadPhoto=  await cloudinary.uploader.upload(req.files.photo.tempFilePath);
  console.log(uploadPhoto);
  
 }
   catch (err) {
    console.log("error");
    res.status(400).json({
      error:err
    })
    
  }
}); 

module.exports = router;
