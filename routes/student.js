const express = require("express")
const router = express.Router()

router.get("/student",async(req,res)=>{
    res.status(200).json({
        msg:"student"
    })
})

module.exports =router;