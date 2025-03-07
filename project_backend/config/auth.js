const jwt=require("jsonwebtoken");
const User=require("../models/User")

const authMiddlewere = async(req,res,next)=>{
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("received token ", token);
    if(!token) return res.status(401).json({message:"Unauthorized token"});

    try {
        console.log("Try Started");
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decode);

        req.user = await User.findById(decode.id).select("-password");
        if(!req.user){
            console.log("User not found!");
            return res.status(401).json({message:"user not found"});
        }
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        if(error.name ==="TokenExpiredError"){
            return res.status(401).json({ message: "Token has expired. Please login again." });

        }else{
          return res.status(401).json({message:"Invalid Token"});
        }
    }
    
}

module.exports=authMiddlewere;