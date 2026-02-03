const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc    Create a new Session and Linked Questions
// @route   POST /api/sessions/create
// @access  Private
const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user.id;  // ✅ Matches your protect middleware (req.user.id)

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get all Sessions of logged-in user
// @route   GET /api/sessions/my-sessions
// @access  Private
const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })  // ✅ req.user.id
      .sort({ createdAt: -1 })
      .populate("questions");  // ✅ Fixed: string path

    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get session by ID with populated questions
// @route   GET /api/sessions/:id
// @access  Private
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 }, },  // ✅ Assuming Question has isPinned
      })
      .exec();

    if (!session) {
      return res.status(404).json({  // ✅ 404 better for not found
        success: false,
        message: "Session not found",
      });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Delete session and its questions
// @route   DELETE /api/sessions/:id
// @access  Private
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.user.toString() !== req.user.id) {  // ✅ Fixed: req.user.id vs params.id
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this session",
      });
    }

    await Question.deleteMany({  // ✅ Fixed: Question model
      session: session._id,
    });

    await session.deleteOne();

    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createSession,
  getMySessions,
  getSessionById,
  deleteSession,
};
