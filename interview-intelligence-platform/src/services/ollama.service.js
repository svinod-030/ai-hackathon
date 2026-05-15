const axios = require("axios");

const OLLAMA_URL = process.env.OLLAMA_URL;

const generateCompletion = async (prompt) => {

    const response = await axios.post(
        `${OLLAMA_URL}/api/generate`,
        {
            model: "llama3.2",
            prompt,
            stream: false
        }
    );

    return response.data.response;
};

const generateEmbedding = async (text) => {

    const response = await axios.post(
        `${OLLAMA_URL}/api/embeddings`,
        {
            model: "nomic-embed-text",
            prompt: text
        }
    );

    return response.data.embedding;
};

module.exports = {
    generateCompletion,
    generateEmbedding
};