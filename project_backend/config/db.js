const mongoose=require("mongoose");

const connectdb =async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI , {});
    console.log(`mongodb connected to : ${conn.connection.host}`)
    return conn;
  } catch (error) {
    console.log(`Error : ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectdb;