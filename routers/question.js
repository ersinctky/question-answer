const express = require("express");

const {getSingleQuestions,getAllQuestions,askNewQuestion,editQuestion,deleteQuestion} = require("../controllers/question");
const {checkQuestionExist}=require("../middlewares/database/databaseErrorHelpers");
const {getAccessToRoute,getQuestionOwnerAccess}=require("../middlewares/authorization/auth");

const router = express.Router();
router.get("/",getAllQuestions);
router.get("/:id",checkQuestionExist,getSingleQuestions);
router.post("/ask",getAccessToRoute,askNewQuestion);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion);
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);




module.exports = router;