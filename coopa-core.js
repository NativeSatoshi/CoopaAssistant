// coopa-core.js - ÇOK DİLLİ DESTEK EKLENMİŞ NİHAİ SÜRÜM

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Irys = require("@irys/sdk");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Çok dilli sistem talimatları
const systemInstructions = {
    tr: `Sen, Coopa adında yardımsever ve proaktif bir dijital asistansın.
    1. Sohbet ve Selamlaşma: Kullanıcı sohbet başlatırsa veya genel soru sorarsa, ASLA araç kullanma. Doğrudan metinle cevap ver.
    2. Eyleme Geçme: Kullanıcı bir eylem isterse (not oluştur, hava durumu, hatırlatıcı kur, takvime ekle vb.), uygun aracı MUTLAKA kullan.
    - Kullanıcının varsayılan e-posta adresi: ${process.env.MY_EMAIL_ADDRESS}.
    - Türkçe olarak yanıt ver ve yardımcı ol.`,
    
    en: `You are Coopa, a helpful and proactive digital assistant.
    1. Chat and Greetings: If user starts a chat or asks general questions, NEVER use tools. Respond directly with text.
    2. Taking Action: If user requests an action (create note, weather, set reminder, add to calendar etc.), MUST use appropriate tool.
    - User's default email address: ${process.env.MY_EMAIL_ADDRESS}.
    - Respond in English and be helpful.`,
    
    es: `Eres Coopa, un asistente digital útil y proactivo.
    1. Chat y Saludos: Si el usuario inicia una conversación o hace preguntas generales, NUNCA uses herramientas. Responde directamente con texto.
    2. Pasar a la Acción: Si el usuario solicita una acción (crear nota, clima, establecer recordatorio, agregar al calendario, etc.), DEBES usar la herramienta apropiada.
    - Dirección de correo predeterminada del usuario: ${process.env.MY_EMAIL_ADDRESS}.
    - Responde en español y sé útil.`
};

// Çok dilli araç tanımları
const toolsMultilingual = {
    tr: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Belirtilen bir şehirdeki güncel hava durumu bilgisini alır.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },

//...
{ 
    name: "send_email", 
    description: "Bir e-postayı ŞİMDİ, YANİ ANINDA gönderir. Asla gelecekteki bir zaman için kullanılmaz. Zamanlama ve planlama için schedule_task aracı kullanılmalıdır.", 
    parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } 
},
//...
{ 
    name: "schedule_task", 
    description: "Bir e-postayı veya hatırlatıcıyı GELECEKTEKİ belirli bir saat için planlar/zamanlar. Kullanıcı 'saat', 'sonra', 'akşam' gibi bir zaman ifadesi kullanırsa MUTLAKA bu araç seçilmelidir.", 
    parameters: { type: "OBJECT", properties: { time: { type: "STRING", description: "'HH:MM' formatında" }, noteName: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["time"] } 
},
//...
                { name: "create_note", description: "Sıfırdan yeni bir not oluşturur veya var olan notun üzerine tamamen yazar.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Var olan bir notun içeriğinin sonuna yeni bilgi ekler.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Daha önceden oluşturulmuş bir notun içeriğini adına göre getirir.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Kullanıcıya o anki saati ve tarihi söyler.", parameters: { type: "OBJECT", properties: {} } },
                { name: "create_calendar_event", description: "Kullanıcının takvimine yeni bir etkinlik veya randevu ekler.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
                {
                    name: "find_memory",
                    description: "Kullanıcının daha önce kaydettiği bir anıyı (görsel, dosya vb.) açıklamasına göre arar ve bulur. '... göster', '... bul', '... getir' gibi komutlar için kullanılır.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            searchText: { type: "STRING", description: "Anıyı bulmak için kullanılacak anahtar kelimeler (örn: 'kırmızı araba')" }
                        },
                        required: ["searchText"]
                    }
                }
            ]
        }
    ],
    en: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Gets current weather information for a specified city.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Sends an email to specified recipient with specified subject and content.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } },
                { name: "create_note", description: "Creates a new note from scratch or completely overwrites an existing note.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Adds new information to the end of an existing note's content.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Retrieves the content of a previously created note by name.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "schedule_task", description: "Schedules a reminder or email task for a future time. Use 'noteName' to remind about an existing note. Use 'subject' and 'body' for a new email.", parameters: { type: "OBJECT", properties: { time: { type: "STRING", description: "In 'HH:MM' format" }, noteName: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["time"] } },
                { name: "get_current_time", description: "Tells the user the current time and date.", parameters: { type: "OBJECT", properties: {} } },
                { name: "create_calendar_event", description: "Adds a new event or appointment to the user's calendar.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
                {
                    name: "find_memory",
                    description: "Searches and finds a memory (image, file, etc.) previously saved by the user based on its description. Used for commands like '... show', '... find', '... get'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            searchText: { type: "STRING", description: "Keywords to find the memory (e.g., 'red car')" }
                        },
                        required: ["searchText"]
                    }
                }
            ]
        }
    ],
    es: [
        {
            functionDeclarations: [
                //...
{ 
    name: "send_email", 
    description: "Envía un correo electrónico AHORA, es decir, INMEDIATAMENTE. Nunca debe usarse para un momento futuro. Para envíos programados, se debe usar la herramienta 'schedule_task'.", 
    parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } 
},
//...
{ 
    name: "schedule_task", 
    description: "Planifica/programa un correo electrónico o recordatorio para una fecha y hora FUTURA específica. Si el usuario menciona una hora o un momento en el futuro ('a las 5', 'mañana', 'más tarde'), se DEBE usar esta herramienta OBLIGATORIAMENTE.", 
    parameters: { type: "OBJECT", properties: { time: { type: "STRING", description: "En formato 'HH:MM'" }, noteName: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["time"] } 
},
//...
                { name: "get_current_weather", description: "Obtiene información meteorológica actual para una ciudad especificada.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "create_note", description: "Crea una nueva nota desde cero o sobrescribe completamente una nota existente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Agrega nueva información al final del contenido de una nota existente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Recupera el contenido de una nota creada previamente por nombre.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Dice al usuario la hora y fecha actuales.", parameters: { type: "OBJECT", properties: {} } },
                { name: "create_calendar_event", description: "Agrega un nuevo evento o cita al calendario del usuario.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
                {
                    name: "find_memory",
                    description: "Busca y encuentra una memoria (imagen, archivo, etc.) previamente guardada por el usuario basándose en su descripción. Se usa para comandos como '... mostrar', '... encontrar', '... obtener'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            searchText: { type: "STRING", description: "Palabras clave para encontrar la memoria (ej: 'coche rojo')" }
                        },
                        required: ["searchText"]
                    }
                }
            ]
        }
    ]
};

async function generateContentFromHistory(history, lang = 'tr') {
    try {
        const selectedLang = lang || 'tr';
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            systemInstruction: systemInstructions[selectedLang] || systemInstructions['tr'],
            toolConfig: { functionCallingConfig: { mode: "AUTO" } },
        });
        
        const tools = toolsMultilingual[selectedLang] || toolsMultilingual['tr'];
        const result = await model.generateContent({ contents: history, tools: tools });
        return result;
    } catch (error) {
        throw error;
    }
}

const getIrys = async () => { /* ... */ };
const uploadToIrys = async (data) => { /* ... */ };
const uploadFileToIrys = async (fileBuffer, tags) => { /* ... */ };

// --- Fonksiyonların Tam İçeriği ---
async function getIrys_full() {
    const url = "https://devnet.irys.xyz"; 
    const token = "matic"; 
    const privateKey = process.env.EVM_PRIVATE_KEY;
    
    if (!privateKey) throw new Error("EVM_PRIVATE_KEY .env dosyasında bulunamadı.");
    
    const irys = new Irys({ 
        url, 
        token, 
        key: privateKey, 
        config: { 
            providerUrl: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` 
        } 
    });
    
    return irys;
}

async function uploadToIrys_full(data) {
    try { 
        const irys = await getIrys_full(); 
        await irys.ready(); 
        const receipt = await irys.upload(JSON.stringify(data)); 
        console.log(`✅ Metin verisi başarıyla Irys'e yüklendi. ID: ${receipt.id}`); 
        return receipt; 
    }
    catch (e) { 
        console.error("❌ Metin Irys'e yüklenirken hata oluştu: ", e.message); 
        return null; 
    }
}

async function uploadFileToIrys_full(fileBuffer, tags) {
    try { 
        console.log("[Irys] Dosya yükleme için Irys'e bağlanılıyor..."); 
        const irys = await getIrys_full(); 
        await irys.ready(); 
        console.log("[Irys] Dosya Irys'e yükleniyor..."); 
        const receipt = await irys.upload(fileBuffer, { tags }); 
        console.log(`✅ Dosya başarıyla Irys'e yüklendi. ID: ${receipt.id}`); 
        return receipt; 
    }
    catch (e) { 
        console.error("❌ Dosya Irys'e yüklenirken hata oluştu: ", e.message); 
        return null; 
    }
}

module.exports = { 
    generateContentFromHistory, 
    uploadToIrys: uploadToIrys_full, 
    uploadFileToIrys: uploadFileToIrys_full 
};