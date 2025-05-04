const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const checkAuth = require("../middleware/checkAuth");

require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// Add-New Student
router.post("/add-student", checkAuth, async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const verifyToken = await jwt.verify(token, "secret key");
    const uploadPhoto = await cloudinary.uploader.upload(
      req.files.image.tempFilePath
    );
    console.log(uploadPhoto);

    const addStudent = await new Student({
      _id: new mongoose.Types.ObjectId(),
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      courseId: req.body.courseId,
      uId: verifyToken.uId,
      imageId: uploadPhoto.public_id,
      imageUrl: uploadPhoto.secure_url,
    });
    const data = await addStudent.save();
    // console.log(data);
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

//get_all student....
router.get("/all-student", checkAuth,async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const verifyToken = await jwt.verify(token, "secret key");
    const course = await Student.find({uId: verifyToken.uId }).select('_id fullName email phone address courseId imageId imageUrl');
    res.status(200).json({
      result: course
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
});

module.exports = router;
