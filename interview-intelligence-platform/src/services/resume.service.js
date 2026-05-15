const prisma = require("../lib/prisma");

const {
    extractTextFromFile
} = require("../utils/parser.util");

const {
    extractSkills
} = require("./skill-extraction.service");

const {
    storeResumeEmbedding
} = require("./resume-embedding.service");

const processResume = async (file) => {

    const content = await extractTextFromFile(file);

    const skills = await extractSkills(content);

    const resume = await prisma.resume.create({
        data: {
            content,
            skills
        }
    });

    await storeResumeEmbedding(
        resume.id,
        content
    );

    return resume;
};

module.exports = {
    processResume
};