const Question= require("../models/Question");
const Answer= require("../models/Answer");

const CustomError = require("../helpers/error/CustomError");
const asyncErrorWraapper = require("express-async-handler");

const addNewAnswerToQuestion = asyncErrorWraapper (async (req,res,next) => {

   const {question_id}=req.params;
   const user_id = req.user.id;
   const information = req.body;
   
   const answer = await Answer.create({
       ...information,
       question:question_id,
       user:user_id
   })
 
    res.status(200).json({
     success:true,
     data:answer
 });
     
 });

 const getAllAnswersByQuestion = asyncErrorWraapper (async (req,res,next) => {

 const {question_id}=req.params;
    
 const question = await Question.findById(question_id).populate("answers");

 const answers = question.answers;

   return  res.status(200).json({
      success:true,
      count:answers.length,
      data:answers
  });
      
});

const getSingleAnswer = asyncErrorWraapper (async (req,res,next) => {

    const {answer_id}=req.params;
       
    const answer = await Answer.findById(answer_id)
    .populate({
        path:"question",
        select:"title"
    })
    .populate({
        path:"user",
        select:"name email"
    });
   
      return  res.status(200).json({
         success:true,
         data:answer
     });
         
 });


   const editAnswer = asyncErrorWraapper (async (req,res,next) => {

    const {answer_id}=req.params;
    const {content}=req.body;

    let answer = await Answer.findById(answer_id);

    answer.content = content;

    await answer.save();

    return res.status(200).json({
        success:true,
        data:answer
    });
    
         
   });   
 
 module.exports = {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer,
    editAnswer
 }