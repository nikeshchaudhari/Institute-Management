const express = require("express")
const app = express();
const userRoute =require('./routes/user');
const batchRoute = require('./routes/batch');
const stdRoute = require('./routes/student')
const feeRoute=require('./routes/fee')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

require('dotenv').config()
const dbConnect = async()=>{
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connect....");
    
}
catch(err){
    console.log("Error");
    res.status(400).json({
        error:err
    })
    
}
}
dbConnect();


app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles:true,
    // tempFileDir:'/tmp/'
}))
app.use('/user',userRoute)
app.use('/batch',batchRoute)
app.use('/student',stdRoute)
app.use('/pay',feeRoute)

app.use('/',(req,res)=>{
res.status(404).json({
    msg:"bad request"
})
})


module.exports=app;