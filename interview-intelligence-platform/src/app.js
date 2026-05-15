require("dotenv").config();

const express = require("express");
const cors = require("cors");

const jdRoutes = require("./routes/jd.route");
const resumeRoutes = require("./routes/resume.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jd", jdRoutes);
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});