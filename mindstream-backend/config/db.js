const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    return conn;
  } catch (error) {
    console.log(`DB Error : ${error.message}`)
    process.exit(1);
  }
};
module.exports = connectdb;