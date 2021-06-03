const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    content:{
        type:String,
        required:[true,"please provide a content"],
        minlenght:[20,"please provide a title at least 20 characters"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    question:{
        type:mongoose.Schema.ObjectId,
        ref:"Question",
        required:true
    }


});

module.exports= mongoose.model("Answer",AnswerSchema);