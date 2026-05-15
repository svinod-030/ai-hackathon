const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const {
    uploadJD
} = require("../controllers/jd.controller");

router.post(
    "/upload",
    upload.single("jd"),
    uploadJD
);

module.exports = router;