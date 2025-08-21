// src/services/emailService.js
const nodemailer = require('nodemailer');
const memoryService = require('./memoryService');
const { t } = require('../config/i18n');

async function sendEmail(args, userAddress, signature, lang) {
    const { to, subject, body, attachmentDescription } = args;
    try {
        const user = process.env.GMAIL_USER;
        const pass = process.env.GMAIL_APP_PASSWORD;
        if (!user || !pass) throw new Error("Gmail credentials missing in .env.");

        let transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });

        const mailOptions = { from: `"Coopa Assistant" <${user}>`, to, subject, text: body, attachments: [] };

        if (attachmentDescription) {
            console.log(`[Email Attachment] Searching for memory: "${attachmentDescription}"`);
            const memory = await memoryService.findMemory(attachmentDescription, userAddress, signature, lang);

            if (memory.found && memory.data?.decryptedDataUrl) {
                console.log(`[Email Attachment] Memory found. Attaching to email...`);
                const [header, data] = memory.data.decryptedDataUrl.split(',');
                const mimeType = header.match(/:(.*?);/)[1];
                const buffer = Buffer.from(data, 'base64');
                mailOptions.attachments.push({
                    filename: memory.description.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'attachment',
                    content: buffer,
                    contentType: mimeType
                });
            } else {
                console.warn(`[Email Attachment] Memory "${attachmentDescription}" not found. Sending email without attachment.`);
                mailOptions.text += `\n\n${t('email_attachment_not_found', lang, { attachmentDescription })}`;
            }
        }

        await transporter.sendMail(mailOptions);
        return { success: true, message: t('email_sent', lang) + ` ${to}` };

    } catch (error) {
        console.error(`[Email Service] Error: ${error.message}`);
        return { success: false, error: `${t('email_error', lang)}: ${error.message}` };
    }
}

module.exports = { sendEmail };