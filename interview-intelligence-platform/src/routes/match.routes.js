const express = require("express");

const router = express.Router();

const {
    matchResumeWithJD
} = require("../services/matching.service");

router.post("/", async (req, res) => {

    try {

        const {
            jdId,
            resumeId
        } = req.body;

        const result = await matchResumeWithJD(
            jdId,
            resumeId
        );

        res.json({
            success: true,
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;