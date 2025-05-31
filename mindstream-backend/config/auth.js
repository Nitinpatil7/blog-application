const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authmiddlwere = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Received Token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized token" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SCT);
    console.log("Decoded Token", decode);
    req.user = await User.findById(decode.id).select("-password");

    if (!req.user) {
      console.log("User Not Found!");
      return res.status(401).json({
        message: "user Not Found",
      });
    }
    next();
  } catch (error) {
    console.log("Token Verification failed: ", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please login again." });
    } else {
      return res.status(401).json({ message: "Invalid Token" });
    }
  }
};

module.exports=authmiddlwere;
