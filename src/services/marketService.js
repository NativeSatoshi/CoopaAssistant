// src/services/marketService.js

const axios = require('axios');

// CoinGecko API URL'i
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";
// Finnhub API URL'i
const FINNHUB_API_URL = "https://finnhub.io/api/v1/quote";

/**
 * Bir kripto paranın fiyatını belirtilen para birimi cinsinden alır.
 * @param {string} coinId - CoinGecko'daki coin ID'si (örn: 'bitcoin', 'ethereum').
 * @param {string} currency - Fiyatın hangi para biriminde istendiği (örn: 'usd', 'eur', 'try').
 * @returns {object} - Başarı durumu ve fiyat bilgisini içeren bir nesne.
 */
async function getCryptoPrice(coinId, currency) {
    try {
        const response = await axios.get(COINGECKO_API_URL, {
            params: {
                ids: coinId.toLowerCase(),
                vs_currencies: currency.toLowerCase()
            }
        });

        const price = response.data[coinId.toLowerCase()][currency.toLowerCase()];
        if (price === undefined) {
            throw new Error(`Price data not found for ${coinId} in ${currency}.`);
        }

        console.log(`[Market Service] Fetched ${coinId} price: ${price} ${currency.toUpperCase()}`);
        return { success: true, coin: coinId, price: price, currency: currency.toUpperCase() };

    } catch (error) {
        console.error("❌ CoinGecko API Error:", error.message);
        return { success: false, error: `Could not retrieve price for '${coinId}'. Please check the coin name.` };
    }
}

/**
 * Bir hisse senedinin anlık fiyatını alır.
 * @param {string} symbol - Hisse senedi sembolü (örn: 'AAPL', 'TSLA', 'GOOGL').
 * @returns {object} - Başarı durumu ve fiyat bilgisini içeren bir nesne.
 */
async function getStockPrice(symbol) {
    try {
        const apiKey = process.env.FINNHUB_API_KEY;
        if (!apiKey) throw new Error("Finnhub API key is not defined in .env file.");

        const response = await axios.get(FINNHUB_API_URL, {
            params: {
                symbol: symbol.toUpperCase(),
                token: apiKey
            }
        });

        const price = response.data.c; // 'c' anlık fiyatı temsil eder (current price)
        if (price === 0 || price === undefined) {
            throw new Error(`Price data not found for symbol ${symbol}.`);
        }

        console.log(`[Market Service] Fetched ${symbol} price: ${price} USD`);
        return { success: true, symbol: symbol.toUpperCase(), price: price, currency: 'USD' };

    } catch (error) {
        console.error("❌ Finnhub API Error:", error.message);
        return { success: false, error: `Could not retrieve price for stock symbol '${symbol}'. Please check the symbol.` };
    }
}

module.exports = {
    getCryptoPrice,
    getStockPrice
};