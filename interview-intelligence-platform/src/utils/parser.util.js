const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const sanitizeText = (text) => {

    if (!text) {
        return "";
    }

    return text
        .replace(/\0/g, "") // remove null bytes
        .replace(/\u0000/g, "")
        .replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]/g, " ")
        .trim();
};

const parsePDF = async (filePath) => {

    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(dataBuffer);

    return sanitizeText(data.text);
};

const parseDOCX = async (filePath) => {

    const result = await mammoth.extractRawText({
        path: filePath
    });

    return sanitizeText(result.value);
};

const extractTextFromFile = async (file) => {

    const extension =
        file.originalname.split(".").pop().toLowerCase();

    if (extension === "pdf") {
        return await parsePDF(file.path);
    }

    if (extension === "docx") {
        return await parseDOCX(file.path);
    }

    throw new Error("Unsupported file type");
};

module.exports = {
    extractTextFromFile,
    sanitizeText
};