const express = require("express");
const connectdb = require("./config/db.js");
const cors =  require("cors");

const dotenv=require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectdb();

app.use("/api/auth" , require("./routes/authroutes"));
app.use("/api/budgets",require("./routes/budgetroutes"))

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))