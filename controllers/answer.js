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

 module.exports = {
    addNewAnswerToQuestion
 }