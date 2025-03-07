const mongoose = require("mongoose");

const blogschema = new mongoose.Schema({

    author:{type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},

    title:{type:String , required: true, trim:true},

    content:{type:String, required:true},

    images:{type: String , required: true},

    category:{
        type:String,
        required:true,
        trim:true    
    },
    tags:[{
        type:String,
        trim:true,
    }],
    comments:[
        {
            user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
            text:{type: String , required: true},
            createdat:{type: Date , default: Date.now},
        }
    ],
    createdat:{
        type: Date , default: Date.now
    }
},
{timestamps:true}
)
module.exports = mongoose.model("Blog",blogschema);