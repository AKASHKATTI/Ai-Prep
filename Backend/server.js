require("dotenv").config();


const express = require('express');
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes= require("./routes/authRoutes"); 
const sessionRoutes = require("./routes/sessionRoutes")

const app = express();

app.use(
    cors({
        origin : '*',
        methods : ["GET" , "POST" ,"PUT" ,"DELETE"],
        allowedHeaders : ["content-type" , "Authorization"]
    })
);

connectDB(); 

// middleware
app.use(express.json());

// routes
app.use('/api/auth' , authRoutes);
app.use('/api/sessions' , sessionRoutes);
// app.use('/api/questions' , questionRoutes);

// app.use('/api/ai/generate-questions' ,protect , generateInterviewQuestions); 
// app.use('/api/ai/generate-explanation' ,protect , generateConceptExplanation); 

app.use("/uploads" , express.static(path.join(__dirname,"uploads"),{}));

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});