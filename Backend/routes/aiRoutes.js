const express = require("express");
const {generateInterviewQuestions , generateConceptExplanation} = require("../controllers/aiControllers");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/generate-questions" , protect , generateInterviewQuestions);
router.post("/generate-explanation" , protect , generateConceptExplanation);




module.exports = router;