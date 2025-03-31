const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// Add a new question
router.post('/add', async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add multiple GK questions
router.post('/add-multiple', async (req, res) => {
    try {
        console.log("⚡ Inserting questions...");

        const sampleQuestions = [
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                answer: "4"
            },
            {
                question: "Who wrote 'Hamlet'?",
                options: ["Shakespeare", "Charles Dickens", "J.K. Rowling", "Mark Twain"],
                answer: "Shakespeare"
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Venus"],
                answer: "Mars"
            },
            {
                question: "What is the capital of Japan?",
                options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
                answer: "Tokyo"
            },
            {
                question: "What is the largest mammal in the world?",
                options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                answer: "Blue Whale"
            }
        ];

        // Fix: Save inserted data correctly
        const savedQuestions = await Question.insertMany(sampleQuestions);
        console.log("✅ Questions inserted:", savedQuestions.length);

        res.status(201).json({ message: `${savedQuestions.length} Questions added successfully!` });
    } catch (err) {
        console.error("❌ Insert Error:", err);
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
