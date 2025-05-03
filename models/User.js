const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    imageUrl:{type:String,require:true},
    imageId:{type:String,require:true}
})

module.exports = mongoose.model("user",userSchema);