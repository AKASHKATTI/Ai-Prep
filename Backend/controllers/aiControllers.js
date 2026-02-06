require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc Generate interview questions and answers using Gemini
// @desc Generate interview questions and answers using Gemini
// @route POST /api/ai/generate-questions
// @access private
const generateInterviewQuestions = async (req, res) => {
  try {
    // Debug API key only ONCE per request
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        message: "🚨 GEMINI_API_KEY missing from .env file!" 
      });
    }

    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message
    });
  }
};

// @desc Generate explanation for an interview question
// @route POST /api/ai/generate-explanation
// @access private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing the question." });
    }

     const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const prompt = conceptExplainPrompt(question);
    
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    console.error("Explanation Error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
