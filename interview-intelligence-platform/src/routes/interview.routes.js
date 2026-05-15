const express = require("express");

const router = express.Router();

const {
    generateInterviewQuestions
} = require("../services/interview.service");

router.post("/", async (req, res) => {

    try {

        const {
            skills,
            experienceLevel
        } = req.body;

        const questions =
            await generateInterviewQuestions(
                skills,
                experienceLevel
            );

        res.json({
            success: true,
            data: questions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;