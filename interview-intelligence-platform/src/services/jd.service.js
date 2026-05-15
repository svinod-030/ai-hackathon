const prisma = require("../lib/prisma");

const {
    extractTextFromFile
} = require("../utils/parser.util");

const {
    extractSkills
} = require("./skill-extraction.service");

const processJD = async (file) => {

    const content = await extractTextFromFile(file);

    const skills = await extractSkills(content);

    const jd = await prisma.jobDescription.create({
        data: {
            content,
            skills
        }
    });

    return jd;
};

module.exports = {
    processJD
};