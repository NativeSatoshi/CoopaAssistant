// src/api/middlewares/authMiddleware.js
const { verifySignature, fixedSignMessage } = require('../../utils/cryptoUtils');
const { t } = require('../../config/i18n');

const checkSignature = async (req, res, next) => {
    const { userAddress, signature } = req.body;
    const lang = req.lang; // Bu, getUserLanguage middleware'i tarafından eklenecek

    if (!userAddress || !signature) {
        return res.status(400).send({ error: t('missing_user_info', lang) });
    }

    const isValid = await verifySignature(fixedSignMessage, signature, userAddress);
    if (!isValid) {
        return res.status(401).send({ error: t('invalid_signature', lang) });
    }

    next(); // İmza geçerliyse bir sonraki adıma geç
};

const checkAdminAccess = (req, res, next) => {
    const { userAddress } = req.body;
    const adminAddresses = process.env.ADMIN_WALLET_ADDRESS?.toLowerCase() || "";
    
    if (!adminAddresses) {
        console.warn('[WARN] Admin wallet addresses are not defined in .env file!');
        return res.status(403).json({ error: "Admin access is not configured."});
    }

    const adminList = adminAddresses.split(',').map(addr => addr.trim());
    const userAddr = userAddress.toLowerCase();

    if (!adminList.includes(userAddr)) {
        console.log(`[Demo] ${userAddress} tried an admin action - blocked`);
        return res.status(403).json({ error: "🔒 This is a demo version. This action requires admin access." });
    }
    
    console.log(`[Admin Action] ${userAddress} is performing an action - allowed`);
    next();
};


const setLanguage = (req, res, next) => {
    const { getUserLanguage } = require('../../config/i18n');
    req.lang = getUserLanguage(req);
    next();
};


module.exports = {
    checkSignature,
    checkAdminAccess,
    setLanguage
};