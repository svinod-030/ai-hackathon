const resumeService = require("../services/resume.service");

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const result = await resumeService.processResume(req.file);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    uploadResume
};