const express = require("express");
const router = express.Router();
const {register,login,getUser,logout,imageUpload,forgotPassword,resetPassword,editDetails} = require("../controllers/auth");
const {getAccessToRoute}=require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");
const { route } = require("./question");

router.post("/register",register);
router.post("/login",login);

router.get("/profile",getAccessToRoute,getUser);
router.get("logout",getAccessToRoute,logout);
router.post("/forgotpassword",forgotPassword);
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);
router.put("/resetpassword",resetPassword);
router.put("/edit",getAccessToRoute,editDetails);


module.exports = router;