const mongoose = require("mongoose");
const courseScheme = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    uId:{type:String,require:true},
    courseName:{type:String,require:true},
    price:{type:Number,require:true},
    description:{type:String,require:true},
    startDate:{type:String,require:true},
    endDate:{type:String,require:true},
    imageId:{type:String,require:true},
    imageUrl:{type:String,require:true}

})


module.exports = mongoose.model('course',courseScheme)