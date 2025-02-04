const express = require("express");
const bodyParser = require("body-parser"); // Fixed variable name casing
const ejs = require("ejs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();

// Configuration
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Use environment variable
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Route handlers
app.get("/", (req, res) => {
    res.render("home");
});

app.post("/generate", async (req, res) => {
    try {
        const userPrompt ="Describe something about "+req.body.promptdestination+" in "+req.body.promptstate; // Get prompt from form input
        const result = await model.generateContent(userPrompt);
        const response = await result.response.text();
        
        res.render("result", { 
            prompt: userPrompt,
            response: response 
        });
        
    } catch (err) {
        console.error("AI Error:", err);
        res.status(500).render("error", { 
            message: "Failed to generate content" 
        });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});