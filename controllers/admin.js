const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWraapper = require("express-async-handler");

const blockUser = asyncErrorWraapper(async(req,res,next)=>{
    const {id}=req.params;

    const user = User.findById(id);

    user.blocked=!user.blocked;

    await user.save();

    return res.status(200).json({
        success:true,
        message:"block-unblock successful"

    });

});

const deleteUser = asyncErrorWraapper(async(req,res,next)=>{
    const {id}=req.params;

    const user = User.findById(id);


    await user.remove();

    return res.status(200).json({
        success:true,
        message:"user delete operation successful"

    });

});

module.exports={
    blockUser,
    deleteUser
};