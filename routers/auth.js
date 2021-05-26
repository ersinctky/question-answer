const express = require("express");
const router = express.Router();
const {register,login,getUser,logout,imageUpload,forgotPassword} = require("../controllers/auth");
const {getAccessToRoute}=require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");

router.post("/register",register);
router.post("/login",login);

router.get("/profile",getAccessToRoute,getUser);
router.get("logout",getAccessToRoute,logout);
router.post("/forgotpassword",forgotPassword);
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload)



module.exports = router;