// src/services/receiptService.js - NİHAİ VE TAM VERSİYON (Turbo SDK Uyumlu)

const arweaveService = require('./arweaveService');
const { encryptString, decryptString } = require('../utils/cryptoUtils');
const { db } = require('../config/database');
const axios = require('axios');

async function recordReceipt(userAddress, signature, receiptData) {
    try {
        const encryptedReceiptString = encryptString(JSON.stringify(receiptData), signature);
        const dataBuffer = Buffer.from(encryptedReceiptString, 'utf-8');

        console.log("[Receipt Service] Uploading encrypted receipt to Arweave via Turbo...");
        
        // --- DEĞİŞİKLİK BURADA: Irys yerine Turbo kullanılıyor ---
        const turbo = arweaveService.getTurboInstance();
        const tags = [{ name: "Content-Type", value: "text/plain" }];
        const receipt = await turbo.upload({
            data: dataBuffer,
            dataItemOpts: { tags }
        });
        // --- DEĞİŞİKLİK SONU ---

        if (!receipt || !receipt.id) throw new Error("Receipt upload to Arweave failed.");
        console.log(`✅ Encrypted receipt successfully uploaded. ID: ${receipt.id}`);
        
        const encryptedDescription = encryptString(receiptData.summary, signature);
        await arweaveService.saveMemoryMetadata(
            receipt.id,
            encryptedDescription,
            'application/json',
            userAddress,
            'receipt'
        );

        return { success: true, transactionId: receipt.id };
    } catch (error) {
        console.error("❌ Error recording receipt:", error);
        return { success: false, error: error.message };
    }
}

const normalizeDate = (dateString) => {
    if (!dateString) { dateString = 'today'; }
    const lowerCaseDate = dateString.toLowerCase();
    const today = new Date();

    if (lowerCaseDate === 'bugün' || lowerCaseDate === 'today') { } 
    else if (lowerCaseDate === 'dün' || lowerCaseDate === 'yesterday') {
        today.setDate(today.getDate() - 1);
    } else {
        if (/^\d{4}-\d{2}-\d{2}$/.test(lowerCaseDate)) {
            return lowerCaseDate;
        }
    }
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

async function findReceiptsByDate(userAddress, signature, startDate, endDate) {
    try {
        const finalStartDate = normalizeDate(startDate);
        const finalEndDate = normalizeDate(endDate);

        console.log(`[Receipt Service] Finding receipts for ${userAddress} between ${finalStartDate} and ${finalEndDate}`);

        const rows = await new Promise((resolve, reject) => {
            const sql = `
                SELECT tx_id FROM memories 
                WHERE user_address = ? 
                AND record_type = 'receipt' 
                AND STRFTIME('%Y-%m-%d', created_at, 'localtime') BETWEEN ? AND ?`;
            
            db.all(sql, [userAddress, finalStartDate, finalEndDate], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        if (rows.length === 0) {
            console.log("[Receipt Service] No receipts found in the local DB for this date range.");
            return { success: true, receipts: [] };
        }

        const promises = rows.map(row => axios.get(`https://arweave.net/${row.tx_id}`, { responseType: 'text' }));
        const responses = await Promise.all(promises);

        const decryptedReceipts = responses.map(response => {
            try {
                const encryptedData = response.data;
                const decryptedJson = decryptString(encryptedData, signature);
                if (!decryptedJson) return null;
                return JSON.parse(decryptedJson);
            } catch (e) {
                console.error("Failed to decrypt or parse a receipt:", e.message);
                return null;
            }
        }).filter(Boolean);

        console.log(`[Receipt Service] Successfully decrypted ${decryptedReceipts.length} receipts.`);
        return { success: true, receipts: decryptedReceipts };

    } catch (error) {
        console.error("❌ Error finding receipts:", error);
        return { success: false, error: error.message };
    }
}

module.exports = { 
    recordReceipt,
    findReceiptsByDate
};