const {
    generateEmbedding
} = require("./ollama.service");

const {
    getCollection
} = require("../lib/chroma");

const storeResumeEmbedding = async (
    resumeId,
    content
) => {

    const embedding = await generateEmbedding(content);

    const collection = await getCollection();

    await collection.add({
        ids: [resumeId],
        embeddings: [embedding],
        documents: [content]
    });

    return embedding;
};

module.exports = {
    storeResumeEmbedding
};