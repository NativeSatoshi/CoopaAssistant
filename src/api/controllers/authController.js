// src/api/controllers/authController.js
const { oauth2Client } = require('../../config/googleClient');
const { db } = require('../../config/database');

const redirectToGoogle = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/calendar.events']
    });
    res.redirect(url);
};

const handleGoogleCallback = async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        
        const sql = `INSERT OR REPLACE INTO google_auth (id, access_token, refresh_token, expiry_date, scope) VALUES (1, ?, ?, ?, ?)`;
        db.run(sql, [tokens.access_token, tokens.refresh_token, tokens.expiry_date, tokens.scope]);
        
        res.redirect('/?auth=success');
    } catch (error) {
        console.error("Google Auth Callback Error:", error.message);
        res.redirect('/?auth=error');
    }
};

module.exports = {
    redirectToGoogle,
    handleGoogleCallback
};