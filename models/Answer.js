const mongoose = require("mongoose");
const Question = require("./Question");
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

AnswerSchema.pre("save", async function(next){


    try{
        if(!this.isModified("user")) return next();

    const question = await Question.findById(this.question);

    question.answer.push(this._id);

    await question.save();

    next();
    }
    catch(err){
      return  next(err);
    }
    
})

module.exports= mongoose.model("Answer",AnswerSchema);