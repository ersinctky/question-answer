const sentJwtToClient = (user,res)=>{
    // generate jwt
    const token = user.generateJwtFromUser();
    const {JWT_COOKIE,NODE_ENV}=process.env;
    return res
    .status(200)
    .cookie("access_token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + parseInt(JWT_COOKIE)*1000*60),
        secure:NODE_ENV === "development" ? false : true
    })
    .json({
        success: true,
        access_token:token,
        data:{
            name:user.name,
            email:user.email
        }
    })
    //response
};

module.exports= sentJwtToClient;