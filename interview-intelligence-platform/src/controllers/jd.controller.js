const jdService = require("../services/jd.service");

const uploadJD = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const result = await jdService.processJD(req.file);

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
    uploadJD
};