// src/api/routes/authRoutes.js
const express = require('express');
const { redirectToGoogle, handleGoogleCallback } = require('../controllers/authController');

const router = express.Router();

router.get('/google', redirectToGoogle);
router.get('/google/callback', handleGoogleCallback);

module.exports = router;