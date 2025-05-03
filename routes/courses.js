const express = require("express");
const router = express.Router();
const Course = require("../models/Courses");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const checkAuth = require("../middleware/checkAuth");

require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
router.post("/add-course", checkAuth, async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const verifyToken = await jwt.verify(token, "secret key");
    const uploadPhoto = await cloudinary.uploader.upload(
      req.files.image.tempFilePath
    );
    console.log(uploadPhoto);

    const courseInsert = await new Course({
      _id: new mongoose.Types.ObjectId(),
      courseName: req.body.courseName,
      price: req.body.price,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      uId: verifyToken.uId,
      imageId: uploadPhoto.public_id,
      imageUrl: uploadPhoto.secure_url,
    });
    const data = await courseInsert.save();
    console.log(data);
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
      error: err,
    });
  }
});
// get all course any user

router.get("/all-course", checkAuth, async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const verifyToken = await jwt.verify(token, "secret key");

    const allCourse = await Course.find({uId:verifyToken.uId}).select('_id uId courseName price description startData endData imageUrl imageId');
    res.status(200).json({
      allCourse: allCourse,
    });
  } catch (err) {
    console.log("error");
    res.status(400).json({
        error:err
    })
    
  }
});

// get one cousrse by Id

router.get("/course-details/:id", checkAuth, async (req, res) => {
    try {
      const token = await req.headers.authorization.split(" ")[1];
      const verifyToken = await jwt.verify(token, "secret key");
  
      const allCourse = await Course.findById(req.params.id).select('_id uId courseName price description startData endData imageUrl imageId');
      res.status(200).json({
        allCourse: allCourse,
      });
    } catch (err) {
      console.log("error");
      res.status(400).json({
          error:err
      })
      
    }
  });

module.exports = router;
