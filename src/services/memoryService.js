// src/services/memoryService.js
const axios = require('axios');
const { db } = require('../config/database');
const { decryptString, decryptBuffer } = require('../utils/cryptoUtils');
const { t } = require('../config/i18n');

async function findMemory(searchText, userAddress, signature, lang) {
    return new Promise((resolve) => {
        const sql = `SELECT * FROM memories WHERE user_address = ? ORDER BY created_at DESC`;

        db.all(sql, [userAddress], async (err, rows) => {
            if (err) {
                console.error("❌ DB error while searching memory:", err.message);
                return resolve({ found: false, error: err.message });
            }

            if (!rows || rows.length === 0) {
                return resolve({ found: false, message: t('memory_not_found', lang) });
            }

            // Basit bir arama algoritması: en çok kelimeyi eşleştireni bul
            const searchKeywords = searchText.toLowerCase().split(' ').filter(word => word.length > 2);
            let bestMatch = null;
            let maxScore = 0;

            for (const row of rows) {
                const decryptedDescription = decryptString(row.description, signature);
                if (!decryptedDescription) {
                    // Anahtar uyuşmazlığı veya veri bozulması, bu anıyı atla
                    continue;
                }

                const descriptionLowerCase = decryptedDescription.toLowerCase();
                let currentScore = searchKeywords.filter(keyword => descriptionLowerCase.includes(keyword)).length;
                
                if (currentScore > maxScore) {
                    maxScore = currentScore;
                    bestMatch = { ...row, decryptedDescription }; // Şifresi çözülmüş açıklamayı da ekle
                }
            }

            if (bestMatch && maxScore > 0) {
                try {
                    console.log(`✅ Best memory match found: "${bestMatch.decryptedDescription}". Fetching data from Arweave...`);
                    const gatewayUrl = `https://arweave.net/${bestMatch.tx_id}`;
                    const response = await axios.get(gatewayUrl, { responseType: 'arraybuffer' });
                    
                    const encryptedBuffer = Buffer.from(response.data, 'binary');
                    const decryptedBuffer = decryptBuffer(encryptedBuffer, signature);

                    if (decryptedBuffer.length === 0) {
                        throw new Error("Decryption resulted in an empty buffer.");
                    }

                    const decryptedDataUrl = `data:${bestMatch.media_type};base64,${decryptedBuffer.toString('base64')}`;
                    
                    return resolve({
                        found: true,
                        description: bestMatch.decryptedDescription,
                        data: { decryptedDataUrl, description: bestMatch.decryptedDescription, mediaType: bestMatch.media_type }
                    });
                } catch (error) {
                    console.error("❌ Error fetching or decrypting memory from Arweave:", error);
                    return resolve({ found: false, error: t('memory_decrypt_error', lang) });
                }
            }
            
            resolve({ found: false, message: t('memory_search_not_found', lang, { searchText }) });
        });
    });
}

module.exports = { findMemory };