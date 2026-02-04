const Session = require("../models/Session");
const Question = require("../models/Question");


// @desc    Add additional questions to an existing session
// @route   POST /api/questions/add
// @access  Private
const addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;  // Fixed: 'question' → 'questions'
        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({
                message: "Invalid input data"
            });
        }

        const session = await Session.findById(sessionId);  
        if (!session) {
            return res.status(404).json({  
                message: "Session not found"
            });
        }

        // Create questions with session reference
        const createQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,  
                question: q.question,
                answer: q.answer,
            }))
        ); 

        // Update session to include new question IDs
        session.questions.push(...createQuestions.map((q) => q._id));  
        await session.save();

        res.status(201).json(createQuestions);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// @desc    pin or unPin Question
// @route   POST /api/questions/:id/pin
// @access  Private

const togglePinQuestion = async(req , res)=>{
    try {
        const question  = await Question.findById(req.params.id);
        if(!question) {
            return res.status(404).json({
                success : false , message : "Question not found"
            })
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({
            success : true , question , message : "updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message:"server error"
        })
    }
}

// @desc    update a note for a question
// @route   POST /api/questions/:id/note
// @access  Private

const updateQuestionNote = async(req , res)=>{
    try {
        const { note } = req.body;

        if (!note || note.trim() === "") {  
            return res.status(400).json({
                success: false,
                message: "Valid note is required"
            });
        }

        const question = await Question.findById(req.params.id);

        if(!question) {
            return res.status(404).json({
                success : false , message : "Question not found"
            })
        }

        question.note  = note || " " ;
        await question.save();
        res.status(200).json({
            success : true , question,message : "note updated successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message:"server error"
        })
    }
}

module.exports ={
    addQuestionsToSession ,
    togglePinQuestion,
    updateQuestionNote
}