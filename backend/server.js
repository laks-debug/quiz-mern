const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const questionRoutes = require('./routes/questionRoutes');
app.use('/api/questions', questionRoutes);
const Question = require('./models/Question');

// const addTestQuestion = async () => {
//     const testQuestion = new Question({
//         question: "What is the capital of Japan?",
//         options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
//         answer: "Tokyo"
//     });

//     try {
//         await testQuestion.save();
//         console.log("✅ Test question inserted successfully!");
//     } catch (error) {
//         console.error("❌ Error inserting test question:", error);
//     }
// };

// addTestQuestion();

const seedQuestions = async () => {
    try {
        const count = await Question.countDocuments();
        if (count === 0) { // Check if database is empty
            await Question.insertMany([
                { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
                { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: "Newton" },
                { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
                { question: "What is the square root of 64?", options: ["6", "8", "10", "12"], answer: "8" },
                { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"], answer: "Leonardo da Vinci" }
            ]);
            console.log("✅ 5 Default Questions Added!");
        } else {
            console.log("✅ Questions already exist, skipping seeding.");
        }
    } catch (error) {
        console.error("❌ Error inserting default questions:", error);
    }
};
seedQuestions()

// Example route
app.get('/', (req, res) => {
    res.send("Quiz API is running...");
});




mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));
