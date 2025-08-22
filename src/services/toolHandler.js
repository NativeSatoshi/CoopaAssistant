// src/services/toolHandler.js
const axios = require('axios');
const noteService = require('./noteService');
const emailService = require('./emailService');
const calendarService = require('./calendarService');
const memoryService = require('./memoryService');
const taskService = require('./taskService');
const marketService = require('./marketService');
const searchService = require('./searchService');
const receiptService = require('./receiptService');
const { t } = require('../config/i18n');

// HAVA DURUMU aracı
async function get_current_weather({ location }, lang) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        if (!apiKey) throw new Error("OpenWeatherMap API key is missing.");
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=${lang}`;
        const response = await axios.get(url);
        return { success: true, data: { location: response.data.name, temp: response.data.main.temp, condition: response.data.weather[0].description } };
    } catch (error) {
        return { success: false, error: t('weather_error', lang, { location }) };
    }
}

// ZAMAN aracı
async function get_current_time(lang) {
    const now = new Date();
    const timeZone = 'Europe/Istanbul';
    const timeString = now.toLocaleTimeString(lang + '-' + lang.toUpperCase(), { hour: '2-digit', minute: '2-digit', timeZone });
    const dateString = now.toLocaleDateString(lang + '-' + lang.toUpperCase(), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone });
    return { success: true, timeInfo: `${t('current_time', lang)} ${timeString}, ${t('current_date', lang)} ${dateString}.` };
}

// Ana araç yönlendirici fonksiyonu
async function handleToolCall(functionCall, context) {
    const { name, args } = functionCall;
    const { userAddress, signature, lang } = context;

    let toolResult = {};
    let resultForHistory = "";
    let newDisplayData = null;

// src/services/toolHandler.js içindeki switch bloğunun tam ve son hali

switch (name) {
    case 'get_note':
        toolResult = await noteService.getNote(args.noteName, lang);
        resultForHistory = t('note_retrieved_successfully', lang);
        break;
    case 'create_note':
        toolResult = await noteService.createNote(args.noteName, args.content, lang);
        resultForHistory = t('note_created_successfully', lang, {noteName: args.noteName});
        break;
    case 'edit_note':
        toolResult = await noteService.editNote(args.noteName, args.newContent, lang);
        resultForHistory = t('note_edited_successfully', lang, {noteName: args.noteName});
        break;
    case 'get_current_weather':
        toolResult = await get_current_weather(args, lang);
        if (toolResult.success) resultForHistory = t('weather_queried_successfully', lang);
        break;
    case 'get_current_time':
        toolResult = await get_current_time(lang);
        resultForHistory = t('time_info_provided', lang);
        break;
    case 'send_email':
        toolResult = await emailService.sendEmail(args, userAddress, signature, lang);
        if (toolResult.success) resultForHistory = t('email_sent_successfully', lang, {to: args.to});
        break;
    case 'create_calendar_event':
        toolResult = await calendarService.createCalendarEvent(args, lang);
        if (toolResult.success) resultForHistory = t('calendar_event_created', lang);
        break;
    case 'schedule_task':
        toolResult = await taskService.scheduleTask(args, userAddress, signature, lang);
        if (toolResult.success) resultForHistory = t('task_scheduled_successfully', lang);
        break;
        
    // --- YENİ EKLENEN ve GÜNCELLENEN KISIM ---
    case 'get_crypto_price':
        toolResult = await marketService.getCryptoPrice(args.coin_name, args.currency);
        if (toolResult.success) {
            // Artık çok dilli
            resultForHistory = t('crypto_price_queried', lang, { coin_name: args.coin_name });
        }
        break;
    case 'get_stock_price':
        toolResult = await marketService.getStockPrice(args.stock_symbol);
        if (toolResult.success) {
            // Artık çok dilli
            resultForHistory = t('stock_price_queried', lang, { stock_symbol: args.stock_symbol });
        }
        break; 
    case 'web_search':
        toolResult = await searchService.webSearch(args.query);
        if (toolResult.success) resultForHistory = `Web search for '${args.query}' was successful.`;
        break;       
    case 'find_memory':
        const memoryResult = await memoryService.findMemory(args.searchText, userAddress, signature, lang);
        toolResult = { ...memoryResult };
        delete toolResult.data;
        if (memoryResult.found) {
            newDisplayData = memoryResult.data;
            resultForHistory = t('memory_found_and_displayed', lang);
        }
        break;
    case 'record_action_receipt':
        // Bu araç arka planda çalıştığı için kullanıcıya özel bir mesaj göstermesine gerek yok.
        // Sadece görevi yerine getirip getirmediğini bilmemiz yeterli.
        toolResult = await receiptService.recordReceipt(userAddress, signature, args);
        if (toolResult.success) {
            console.log(`✅ Receipt '${args.summary}' recorded successfully.`);
            // resultForHistory'yi boş bırakıyoruz ki sohbete gereksiz bir mesaj eklenmesin.
            resultForHistory = ""; 
        }
        break;
    case 'find_receipts':
        toolResult = await receiptService.findReceiptsByDate(userAddress, signature, args.start_date, args.end_date);
        if (toolResult.success) {
            // Yapay zekanın yorumlaması için bulunan makbuz sayısını bir metin olarak geçmişe ekleyelim.
            resultForHistory = `Found ${toolResult.receipts.length} receipts for the specified date range.`;
        }
        break;
    default:
        toolResult = { success: false, error: "Unknown tool requested." };
}
    
    // Modelin görmesi için `toolResult`
    // Sohbet geçmişine eklenmesi için `resultForHistory`
    // Arayüzde gösterilmesi için `newDisplayData`
    return { toolResult, resultForHistory, newDisplayData };
}

module.exports = { handleToolCall };