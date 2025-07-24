// coopa-core.js - STABİL VERSİYON (Resim Üretme Hariç)

require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Irys = require("@irys/sdk");
const fs = require('fs');
const axios = require("axios");
const crypto = require('crypto');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const privateKeyFileName = "evm-wallet.key";
const rpcUrl = "https://rpc-amoy.polygon.technology/";

const tools = [
    {
        "function_declarations": [
            {
                "name": "get_current_weather",
                "description": "Belirtilen konumdaki mevcut hava durumunu getirir.",
                "parameters": { "type": "OBJECT", "properties": { "location": { "type": "STRING", "description": "Hava durumunun öğrenileceği şehir" } }, "required": ["location"] }
            },
            {
                "name": "send_email",
                "description": "Belirtilen alıcıya bir e-posta gönderir.",
                "parameters": { "type": "OBJECT", "properties": { "to": { "type": "STRING", "description": "E-postanın alıcısı" }, "subject": { "type": "STRING", "description": "E-postanın konusu" }, "body": { "type": "STRING", "description": "E-postanın içeriği" } }, "required": ["to", "subject", "body"] }
            }
        ]
    }
];

function encryptData(text) { try { const iv = crypto.randomBytes(16); const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); const cipher = crypto.createCipheriv('aes-256-gcm', key, iv); const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]); const authTag = cipher.getAuthTag(); return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`; } catch (error) { console.error("❌ Şifreleme sırasında hata:", error); return text; } }
function decryptData(encryptedText) { try { const parts = encryptedText.split(':'); if (parts.length !== 3) { return encryptedText; } const [ivHex, authTagHex, encryptedHex] = parts; const iv = Buffer.from(ivHex, 'hex'); const authTag = Buffer.from(authTagHex, 'hex'); const encrypted = Buffer.from(encryptedHex, 'hex'); const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv); decipher.setAuthTag(authTag); const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]); return decrypted.toString('utf8'); } catch (error) { console.error("❌ Şifre çözme sırasında hata:", error); return encryptedText; } }

async function generateAIMessage(prompt, history = [], file = null) {
    if (!GEMINI_API_KEY) throw new Error("Gemini API Anahtarı eksik.");
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest", tools });
        const chat = model.startChat({ history });
        const content = [prompt];
        if (file) {
            console.log("Çok-modlu istek hazırlanıyor: Metin + Dosya");
            content.push({ inlineData: { data: file.buffer.toString("base64"), mimeType: file.mimetype } });
        }
        const result = await chat.sendMessage(content);
        return { response: result.response, chat };
    } catch (error) {
        console.error("❌ HATA: Gemini AI ile iletişim sırasında bir sorun oluştu:", error.message);
        throw error;
    }
}

const getIrys = async () => { const privateKeyBuffer = fs.readFileSync(privateKeyFileName); const privateKey = privateKeyBuffer.toString('hex'); return new Irys({ network: "devnet", token: "matic", key: privateKey, config: { providerUrl: rpcUrl } }); };
async function uploadToIrys(dataToUpload) { const irys = await getIrys(); const tags = [{ name: "Content-Type", value: "text/plain; charset=utf-8" }]; return await irys.upload(String(dataToUpload), { tags }); }
async function uploadFileToIrys(filePath) { const irys = await getIrys(); console.log(`Dosya Irys'e yükleniyor: ${filePath}`); const receipt = await irys.uploadFile(filePath); console.log(`✅ Dosya başarıyla yüklendi! Irys ID: ${receipt.id}`); return receipt; }
async function loadHistoryFromIrys(transactionId) { try { const response = await axios.get(`https://gateway.irys.xyz/${transactionId}`); const decryptedData = decryptData(response.data); return JSON.parse(decryptedData); } catch (error) { return []; } }

module.exports = { generateAIMessage, uploadToIrys, uploadFileToIrys, loadHistoryFromIrys, encryptData, decryptData };