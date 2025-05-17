const jwt = require("jsonwebtoken")

module.exports=async(req,res,next)=>{
try{
const token = await req.headers.authorization.split(" ")[1]
// console.log(token);
const verifyToken = await jwt.verify(token,'secret key')
console.log(verifyToken);
next();


}
catch(err){
    console.log("error");
    
return res.status(401).json({
    error:"Invalid token"
})
}
}