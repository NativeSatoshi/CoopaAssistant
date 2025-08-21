// src/services/geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { systemInstructions, toolsMultilingual } = require('../config/i18n');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateContentFromHistory(history, lang = 'tr') {
    try {
        const selectedLang = lang || 'tr';
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            systemInstruction: systemInstructions[selectedLang] || systemInstructions['tr'],
            toolConfig: { functionCallingConfig: { mode: "AUTO" } },
        });
        
        const tools = toolsMultilingual[selectedLang] || toolsMultilingual['tr'];
        const result = await model.generateContent({ contents: history, tools: tools });
        return result;
    } catch (error) {
        console.error("Gemini Service Error:", error);
        throw new Error("Failed to generate content from AI service.");
    }
}

module.exports = {
    generateContentFromHistory
};