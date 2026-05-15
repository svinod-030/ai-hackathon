const prisma = require("../lib/prisma");

const {
    generateCompletion
} = require("./ollama.service");

const calculateMatch = async (
    jdContent,
    resumeContent
) => {

    const prompt = `
  Compare the following Job Description
  and Resume.

  Give:
  1. Match percentage
  2. Strengths
  3. Weaknesses
  4. Final recommendation

  Return valid JSON only.

  JD:
  ${jdContent}

  Resume:
  ${resumeContent}
  `;

    const response = await generateCompletion(prompt);

    return JSON.parse(response);
};

const matchResumeWithJD = async (
    jdId,
    resumeId
) => {

    const jd = await prisma.jobDescription.findUnique({
        where: { id: jdId }
    });

    const resume = await prisma.resume.findUnique({
        where: { id: resumeId }
    });

    const result = await calculateMatch(
        jd.content,
        resume.content
    );

    await prisma.matchResult.create({
        data: {
            jdId,
            resumeId,
            score: result.matchPercentage,
            summary: JSON.stringify(result)
        }
    });

    return result;
};

module.exports = {
    matchResumeWithJD
};