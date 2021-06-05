const Question= require("../models/Question");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWraapper = require("express-async-handler");

const getAllQuestions = asyncErrorWraapper (async (req,res,next) => {
    
    const populate = true;
    const populateObject = {
        path:"user",
        select:"name profile_image"
    };
    let query = Question.find();
   // search

    if(req.query.search){
        const searchObject ={};
        const regex = new RegExp(req.query.search,"i");
        searchObject["title"]=regex;
        query = query.where(searchObject);
    }
    
    // populate

    if(populate){
        query = query.populate(populateObject)
    }

    // pagination

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page-1)*limit;
    const endIndex = page*limit;

    const pagination = {};
    const total = await Question.countDocuments();
    if(startIndex>0){
        pagination.previous={
            page:page-1,
            limit:limit
        }
    }
    if(endIndex<total){
        pagination.next={
            page:page+1,
            limit:limit
        }
    }
    
    query= query.skip(startIndex).limit(limit);


    const question = await query;
    // console.log(req.query.search);

//    const question= await Question.find().where({title:"Questions 3 - Title"});

   return res.status(200).json({
    success:true,
    count:question.length,
    pagination:pagination,
    data:question
});
    
});

const askNewQuestion = asyncErrorWraapper (async (req,res,next) => {

const information = req.body;

const question= await Question.create({
    ...information,
    user:req.user.id
});

res.status(200).json({
    success:true,
    data:question
});


});

const getSingleQuestions = asyncErrorWraapper (async (req,res,next) => {

    const {id} = req.params;
    
    const question= await Question.findById(id);
    
    res.status(200).json({
        success:true,
        data:question
    });
    
    
});


const editQuestion = asyncErrorWraapper (async (req,res,next) => {

    const {id} = req.params;
    
    const {title,content}=req.body;

    let question= await Question.findById(id);

    question.title=title;
    question.content = content;

    question= await question.save();

    res.status(200).json({
        success:true,
        data:question
    });
    
    
});

const deleteQuestion = asyncErrorWraapper (async (req,res,next) => {

    const {id} = req.params;
    
    await Question.findByIdAndDelete(id);


    res.status(200).json({
        success:true,
        message:"question delete successful"
    });
    
    
});

const likeQuestion = asyncErrorWraapper (async (req,res,next) => {

    const {id} = req.params;
    
    const question = await Question.findById(id);

    if(question.likes.includes(req.user.id)){
        return next(new CustomError("You already liked this question",400));
    }

    question.likes.push(req.user.id);
    question.likeCount=question.likes.length;
    await question.save();


    res.status(200).json({
        success:true,
        data:question
    });
    
    
});


const undoLikeQuestion = asyncErrorWraapper (async (req,res,next) => {

    const {id} = req.params;
    
    const question = await Question.findById(id);

    if(!question.likes.includes(req.user.id)){
        return next(new CustomError("You can not undo like operation for  this question",400));
    }
    
   const index = question.likes.indexOf(req.user.id);

   question.likes.splice(index,1);
   question.likeCount=question.likes.length;



    await question.save();


    res.status(200).json({
        success:true,
        data:question
    });
    
    
});


module.exports={
    askNewQuestion,
    getAllQuestions,
    getSingleQuestions,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undoLikeQuestion
};