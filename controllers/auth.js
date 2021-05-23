const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWraapper = require("express-async-handler");
const {sentJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput,comparePassword}=require("../helpers/input/inputHelpers");
const register = asyncErrorWraapper (async (req,res,next) => {
    
    const {name,email,password,role}=req.body;
    
        const user = await User.create({
        name,
        email,
        password,
        role
    });
    sentJwtToClient(user,res);
   
    
});
const login = asyncErrorWraapper (async (req,res,next) =>{
    const {email,password}=req.body;
    if(!validateUserInput(email,password)){
        return next(new CustomError("please check your input",400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!comparePassword(password,user.password)){
        return next(new CustomError("please check your credentials",400))
    }
    sentJwtToClient(user,res);
});

const getUser = (req,res,next)=>{
    res.json({
        success:true,
        data:{
            id:req.user.id,
            name:req.user.name
        }
    })
};


module.exports = {
    register,
    getUser,
    login
};