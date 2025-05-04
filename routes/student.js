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
router.get("/all-student", checkAuth, async (req, res) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const verifyToken = await jwt.verify(token, "secret key");
    const course = await Student.find({ uId: verifyToken.uId }).select(
      "_id uId fullName email phone address courseId imageId imageUrl"
    );
    res.status(200).json({
      result: course,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
});

// get own all student  for a course

router.get("/all-student/:courseId", checkAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, "secret key");
    const course = await Student.find({
      uId: verifyToken.uId,
      courseId: req.params.courseId,
    });

    res.status(200).json({
      viewCourseStudent: course,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
});
// Update Student All
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = await jwt.verify(token, "secret key");
    console.log(verifyToken);
    const updateStudents = await Student.find({ _id: req.params.id });
    // console.log(updateStudent[0]);

    if (updateStudents[0].uId != verifyToken.uId) {
      return res.status(500).json({
        error: "Access Denai..",
      });
    }
    if (req.files) {
      await cloudinary.uploader.destroy(updateStudents[0].imageId);
      const uploadImage = await cloudinary.uploader.upload(
        req.files.image.tempFilePath
      );
      const studentUpdate = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        courseId: req.body.courseId,
        uId: verifyToken._id,
        imageId: uploadImage.public_id,
        imageUrl: uploadImage.secure_url,
      };
      // console.log("files is ready");
      const findUpdateStudent = await Student.findByIdAndUpdate(
        req.params.id,
        studentUpdate,{new:true}
      );
      res.status(200).json({
        updatedData: findUpdateStudent,
      });
    } else {
        const upDate ={
            fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        courseId: req.body.courseId,
        uId: verifyToken._id,
        }
       const findUpdateStudent = await Student.findByIdAndUpdate(req.params.id)
       res.status(200).json({
        ElseData:findUpdateStudent
       })
      console.log("file is not ready..");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
});
// Delete Student API

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, "secret key");

    const deleteStudent = await Student.find({ _id: req.params.id });
    console.log(deleteStudent[0]);

    if (deleteStudent[0].uId != verifyToken.uId) {
      return res.status(500).json({
        error: "Access Denai...",
      });
    }
    await cloudinary.uploader.destroy(deleteStudent[0].imageId);
    const deleteData = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({
      deleteStudentData: "deleteData",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
});
module.exports = router;
