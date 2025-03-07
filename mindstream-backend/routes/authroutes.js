const express = require("express")
const router = express.Router();
const {signinuser,loginuser}= require("../controller/authcontroller");


router.post("/signin", signinuser);
router.post("/login",loginuser);

module.exports= router;