const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/signup", async (req, res) => {
  try {
    const user = await User.find({email: req.body.email });
    if (user.length > 0) {
      return res.status(401).json({
        msg: "email already register",
      });
    }
    const uploadPhoto = await cloudinary.uploader.upload(
      req.files.image.tempFilePath
    );
    // console.log(uploadPhoto);

    const hashCode = await bcrypt.hash(req.body.password, 10);
    console.log(hashCode);

    const newUser = await new User({
      _id: new mongoose.Types.ObjectId(),
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashCode,
      phone:req.body.phone,
      imageUrl: uploadPhoto.secure_url,
      imageId: uploadPhoto.public_id,
    });

    const dataInsert = await newUser.save();
    res.status(200).json({
      message: "User Created Successfully",
      fullName: dataInsert.fullName,
      email: dataInsert.email,
      phone: dataInsert.phone,
      _id: dataInsert.id,
      imageUrl: dataInsert.imageUrl,
      imageId: dataInsert.imageId,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
});

// get
router.post("/login", async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user.length == 0) {
    return res.status(401).json({
      error: "Email not register...",
    });
  }
  const isMatch = await bcrypt.compare(req.body.password, user[0].password);
  if (!isMatch) {
    return res.status(401).json({
      error: "Invalid password",
    });
  }
  const token = await jwt.sign(
    {
      uId: user[0]._id,
      fullName: user[0].fullName,
      email: user[0].email,
      phone:req.body.phone,
      imageId: user[0].imageId,
      imageUrl: user[0].imageUrl,
    },
    "secret key",
    {
      expiresIn: "365d",
    }
  );
  res.status(200).json({
    uId: user[0]._id,
    fullName: user[0].fullName,
    email: user[0].email,
    phone:req.body.phone,
    imageId: user[0].imageId,
    imageUrl: user[0].imageUrl,
    token: token,
  });
});

module.exports = router;
