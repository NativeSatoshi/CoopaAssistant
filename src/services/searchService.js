// src/services/searchService.js
const axios = require('axios');

async function webSearch(query) {
    try {
        const apiKey = process.env.SERPER_API_KEY;
        if (!apiKey) throw new Error("Serper API key is not defined in .env file.");

        const response = await axios.post('https://google.serper.dev/search', {
            q: query
        }, {
            headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.data || !response.data.organic) {
            return { success: false, error: "No search results found." };
        }

        // Arama sonuçlarından ilk 3 tanesini alıp özetleyelim
        const results = response.data.organic.slice(0, 3).map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet
        }));

        console.log(`[Search Service] Found ${results.length} results for query: "${query}"`);
        return { success: true, results };

    } catch (error) {
        console.error("❌ Serper API Error:", error.message);
        return { success: false, error: "An error occurred while searching the web." };
    }
}

module.exports = { webSearch };