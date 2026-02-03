const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authControllers');
const protect = require('../middlewares/authMiddleware'); 

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/profile', protect, getUserProfile);

// Uncomment when multer setup ready:
// authRouter.post('/upload-image', upload.single('image'), async (req, res) => {
//     if (!req.file || !req.file.path) {
//         return res.status(400).json({ message: 'Upload failed' });
//     }
//     res.status(200).json({ imageUrl: req.file.path });
// });

module.exports = authRouter; 
