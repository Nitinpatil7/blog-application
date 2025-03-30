const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/mindstream", {});
    return conn;
  } catch (error) {
    console.log(`DB Error : ${error.message}`)
    process.exit(1);
  }
};
module.exports = connectdb;
