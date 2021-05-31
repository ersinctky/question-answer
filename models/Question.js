const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title:{
        type:String,
        required:[true,"please provide a title"],
        minlenght:[10,"please provide a title at least 10 characters"],
        unique:true
    },
    content:{
        type:String,
        required:[true,"please provide a content"],
        minlenght:[20,"please provide a title at least 20 characters"]
    },
    slug:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    }
});


module.exports= mongoose.model("Question",QuestionSchema);