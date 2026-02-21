// src/app.js
const express = require('express');
const path = require('path');
const cors = a = require('cors');

const apiRoutes = require('./api/routes/apiRoutes');
const authRoutes = require('./api/routes/authRoutes');

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Statik dosyalar için 'public' klasörünü kullan
app.use(express.static(path.join(__dirname, '../public')));

// Ana sayfa rotası
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'landing.html'));
});

app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
// API Rotaları
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Genel Hata Yönetimi
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Sunucuda bir hata oluştu!');
});

module.exports = app;