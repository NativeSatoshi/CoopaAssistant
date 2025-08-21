// src/api/controllers/uploadController.js
const arweaveService = require('../../services/arweaveService');
const { encryptBuffer, encryptString } = require('../../utils/cryptoUtils');
const { t } = require('../../config/i18n');

const handleUpload = async (req, res) => {
    const { description, userAddress, signature } = req.body;
    const file = req.file;
    const lang = req.lang;

    try {
        if (!file || !description) {
            return res.status(400).send(t('missing_info', lang));
        }

        console.log(`[Upload] Encrypting file for ${userAddress}...`);
        const encryptedBuffer = encryptBuffer(file.buffer, signature);
        
        console.log(`[Upload] Uploading encrypted file to Arweave...`);
        const receipt = await arweaveService.uploadFileToArweave(encryptedBuffer, file.mimetype);
        if (!receipt) {
            throw new Error("Failed to upload encrypted file to Arweave.");
        }

        console.log(`[Upload] Saving memory metadata to database...`);
        const encryptedDescription = encryptString(description, signature);
        await arweaveService.saveMemoryMetadata(receipt.id, encryptedDescription, file.mimetype, userAddress);

        const gatewayUrl = `https://arweave.net/${receipt.id}`;
        
        const successHtml = `
            <div style="font-family: sans-serif; padding: 20px;">
                <h1>✅ ${t('upload_success', lang)}</h1>
                <p><b>${lang === 'tr' ? 'Açıklama' : 'Description'}:</b> ${description}</p>
                <p><b>Arweave Transaction ID:</b> ${receipt.id}</p>
                <p><a href="${gatewayUrl}" target="_blank">View Encrypted File on Arweave</a></p>
                <br><a href="/">Back to Chat</a>
            </div>`;

        res.send(successHtml);

    } catch (error) {
        console.error("❌ /upload route error:", error.message);
        res.status(500).send(`${t('server_error', lang)}: ${error.message}`);
    }
};

module.exports = {
    handleUpload
};