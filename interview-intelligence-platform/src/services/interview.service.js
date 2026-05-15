const {
    generateCompletion
} = require("./ollama.service");

const generateInterviewQuestions = async (
    skills,
    experienceLevel = "mid"
) => {

    const prompt = `
  Generate 10 technical interview questions.

  Skills:
  ${skills.join(", ")}

  Experience Level:
  ${experienceLevel}

  Return JSON array only.
  `;

    const response = await generateCompletion(prompt);

    return JSON.parse(response);
};

module.exports = {
    generateInterviewQuestions
};