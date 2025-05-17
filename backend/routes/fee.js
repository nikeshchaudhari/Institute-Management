const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

router.get("/fee",async(req,res)=>{
    res.status(200).json({
        msg:"fee"
    })
})

module.exports =router; 