const mongoose = require("mongoose");

const expenseschema = new mongoose.Schema({
    title:{type: String, required: true},
    amount:{type:Number , required:true},
    date:{type: Date , default: Date.now}
},{timestamps:true});

const budgetschema = new mongoose.Schema({
    name: {type: String , required: true},
    amount:{type: Number , required : true},
    spend:{type: Number , default:0 , required:true},
    expenses :[expenseschema],
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true , index:true}
}, {timestamps:true})
module.exports = mongoose.model("Budget", budgetschema)