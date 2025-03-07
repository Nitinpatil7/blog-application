const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.registeruser = async (req,res)=>{
    const {name, email , password} = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userexist = await User.findOne({email});
        if(userexist) return res.status(400).json({message:"User already Exists"})
        console.log("Hashing password:", password);
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password:hashedpassword});

        res.status(201).json({message:"User registered succesfully" , user})

    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

exports.loginuser = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid credentials"})

        const ismatch = await bcrypt.compare(password , user.password);
        if(!ismatch) return res.status(400).json({message :"invalid credentials"});

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.status(200).json({token , user});
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}