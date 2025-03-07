const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signinuser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const userexist = await User.findOne({email});
    if(userexist){
        return res.status(400).json({
            message:"User Already Exist"
        })
    }
    const hashedpasssword = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:hashedpasssword});

    res.status(201).json({
        message:"User Signin Successfully!"
    })
  } catch (error) {
    res.status(201).json({
        error:error.message
    })
  }
};

exports.loginuser = async(req,res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid Credential"
            })
        }
        const ismatch = await bcrypt.compare(password, user.password)

        if(!ismatch){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SCT, {expiresIn:"1h"});
        console.log("user data from db: ",user);

        res.status(200).json({token , user});
        
    } catch (error) {
        res.status(200).json({error: error.message});
    }
}
