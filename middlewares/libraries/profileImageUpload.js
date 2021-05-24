const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");

// storage, Filefilter

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/uploads"));
    },
    filename:function(req,file,cb){
        const extension=file.mimetype.split("/")[1];
        req.saveProfileImage="image_" + req.use.id + "." + extension;
        cb(null,req.saveProfileImage);
    }

});

const fileFilter = (req,file,cb)=>{
    let allowedMimeType= ["image/jpg","image/gif","image/jpeg","image/png"];
    if(!allowedMimeType.includes(file.mimetype)){
        return cb(new CustomError("please provide a valid image file",400),false);
    }
    return cb(null,true);
}

const profileImageUpload = multer({storage,fileFilter});

module.exports = profileImageUpload;