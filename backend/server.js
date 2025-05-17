const http =require("http")
const app = require('./app')
const server = http.createServer(app)

server.listen(9500,()=>{
    console.log("institute server is runnning....");
    
})