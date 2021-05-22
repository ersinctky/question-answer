const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWraapper = require("express-async-handler");
const sentJwtToClient = require("../helpers/authorization/sentJwtToClient");

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

const errorTest = (req,res,next)=>{
    return next(new TypeError("custom error message",400));

};

module.exports = {
    register,
    errorTest
};