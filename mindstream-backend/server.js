const express = require("express")
const connectdb = require("./config/db.js");
const cors= require("cors");
const dotenv=require("dotenv")
const bodyparser = require("body-parser");

dotenv.config();

const app = express();
app.use(cors())
app.use(bodyparser.json({limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true })); 
connectdb();

app.use("/auth" , require("./routes/authroutes"));
app.use("/blog",require("./routes/blogroutes"))

const port = 5000;
app.listen(port, ()=>{
    console.log(`App Running on port ${port}`)
})