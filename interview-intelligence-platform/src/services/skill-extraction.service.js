const {
    generateCompletion
} = require("./ollama.service");

const extractJSONArray = (text) => {

    try {

        // direct parse attempt
        return JSON.parse(text);

    } catch (error) {

        // extract JSON array from messy response
        const match = text.match(/\[[\s\S]*\]/);

        if (!match) {
            return [];
        }

        try {
            return JSON.parse(match[0]);
        } catch {
            return [];
        }
    }
};

const extractSkills = async (text) => {

    const prompt = `
You are a resume skill extraction engine.

Extract ONLY technical skills from the text below.

RULES:
- Return ONLY valid JSON array
- No explanation
- No markdown
- No extra text
- No sentence before or after
- Output must start with [
- Output must end with ]

Example:
["React", "Node.js", "PostgreSQL"]

Resume Text:
${text.slice(0, 5000)}
`;

    const response = await generateCompletion(prompt);

    const skills = extractJSONArray(response);

    return [...new Set(skills)];
};

module.exports = {
    extractSkills
};