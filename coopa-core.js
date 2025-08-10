// coopa-core.js - ÇOK DİLLİ DESTEK EKLENMİŞ NİHAİ SÜRÜM

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Çok dilli sistem talimatları
const systemInstructions = {
    tr: `Sen, Coopa adında yardımsever ve proaktif bir dijital asistansın.
    1. Sohbet ve Selamlaşma: Kullanıcı sohbet başlatırsa veya genel soru sorarsa, ASLA araç kullanma. Doğrudan metinle cevap ver.
    2. Eyleme Geçme: Kullanıcı bir eylem isterse (not oluştur, hava durumu, hatırlatıcı kur, takvime ekle vb.), uygun aracı MUTLAKA kullan.
    - Kullanıcının varsayılan e-posta adresi: ${process.env.MY_EMAIL_ADDRESS}.
    - Türkçe olarak yanıt ver ve yardımcı ol.`,
    
    en: `You are Coopa, a helpful and proactive digital assistant.
1. Chat and Greetings: If user starts a conversation or asks general questions, NEVER use tools. Respond directly with text.
2. Taking Action: If user requests an action (create note, weather, set reminder, add to calendar, etc.), ALWAYS use the appropriate tool.
- User's default email address: ${process.env.MY_EMAIL_ADDRESS}.
- Respond in English and be helpful.`,

es: `Eres Coopa, un asistente digital útil y proactivo.
1. Chat y Saludos: Si el usuario inicia una conversación o hace preguntas generales, NUNCA uses herramientas. Responde directamente con texto.
2. Tomar Acción: Si el usuario solicita una acción (crear nota, clima, configurar recordatorio, agregar al calendario, etc.), SIEMPRE usa la herramienta apropiada.
- Dirección de email predeterminada del usuario: ${process.env.MY_EMAIL_ADDRESS}.
- Responde en español y sé útil.`,

fr: `Tu es Coopa, un assistant numérique utile et proactif.
1. Chat et Salutations: Si l'utilisateur commence une conversation ou pose des questions générales, N'utilise JAMAIS d'outils. Réponds directement avec du texte.
2. Passer à l'Action: Si l'utilisateur demande une action (créer note, météo, définir rappel, ajouter au calendrier, etc.), utilise TOUJOURS l'outil approprié.
- Adresse email par défaut de l'utilisateur: ${process.env.MY_EMAIL_ADDRESS}.
- Réponds en français et sois utile.`,

it: `Sei Coopa, un assistente digitale utile e proattivo.
1. Chat e Saluti: Se l'utente inizia una conversazione o fa domande generali, NON usare MAI strumenti. Rispondi direttamente con testo.
2. Passare all'Azione: Se l'utente richiede un'azione (creare nota, meteo, impostare promemoria, aggiungere al calendario, ecc.), usa SEMPRE lo strumento appropriato.
- Indirizzo email predefinito dell'utente: ${process.env.MY_EMAIL_ADDRESS}.
- Rispondi in italiano e sii utile.`,

zh: `你是 Coopa，一个有用且主动的数字助手。
1. 聊天和问候：如果用户开始对话或询问一般问题，绝不使用工具。直接用文本回复。
2. 采取行动：如果用户请求操作（创建笔记、天气、设置提醒、添加到日历等），始终使用适当的工具。
- 用户默认邮箱地址：${process.env.MY_EMAIL_ADDRESS}。
- 用中文回复并提供帮助。`,

de: `Du bist Coopa, ein hilfreicher und proaktiver digitaler Assistent.
1. Chat und Begrüßungen: Wenn der Benutzer ein Gespräch beginnt oder allgemeine Fragen stellt, verwende NIEMALS Tools. Antworte direkt mit Text.
2. Handeln: Wenn der Benutzer eine Aktion anfordert (Notiz erstellen, Wetter, Erinnerung setzen, zum Kalender hinzufügen, usw.), verwende IMMER das entsprechende Tool.
- Standard-E-Mail-Adresse des Benutzers: ${process.env.MY_EMAIL_ADDRESS}.
- Antworte auf Deutsch und sei hilfsbereit.`,

ru: `Ты Coopa, полезный и проактивный цифровой помощник.
1. Чат и Приветствия: Если пользователь начинает разговор или задает общие вопросы, НИКОГДА не используй инструменты. Отвечай напрямую текстом.
2. Переход к Действию: Если пользователь запрашивает действие (создать заметку, погода, установить напоминание, добавить в календарь и т.д.), ВСЕГДА используй подходящий инструмент.
- Email адрес пользователя по умолчанию: ${process.env.MY_EMAIL_ADDRESS}.
- Отвечай на русском языке и будь полезным.`
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
    ],
    fr: [
    {
        functionDeclarations: [
            { name: "get_current_weather", description: "Obtient les informations météorologiques actuelles pour une ville spécifiée.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
            { name: "send_email", description: "Envoie un email MAINTENANT, INSTANTANÉMENT. Jamais utilisé pour les horaires futurs. Pour programmer, l'outil schedule_task doit être utilisé.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } },
            { name: "schedule_task", description: "Programme/planifie un email ou rappel pour une heure FUTURE spécifique. Si l'utilisateur utilise des expressions comme 'à', 'plus tard', 'soir', cet outil DOIT être sélectionné.", parameters: { type: "OBJECT", properties: { time: { type: "STRING", description: "au format 'HH:MM'" }, noteName: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["time"] } },
            { name: "create_note", description: "Crée une nouvelle note à partir de zéro ou écrase complètement une note existante.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
            { name: "edit_note", description: "Ajoute de nouvelles informations à la fin du contenu d'une note existante.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
            { name: "get_note", description: "Récupère le contenu d'une note créée précédemment par son nom.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
            { name: "get_current_time", description: "Dit à l'utilisateur l'heure et la date actuelles.", parameters: { type: "OBJECT", properties: {} } },
            { name: "create_calendar_event", description: "Ajoute un nouvel événement ou rendez-vous au calendrier de l'utilisateur.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
            { name: "find_memory", description: "Recherche et trouve une mémoire (image, fichier, etc.) que l'utilisateur a sauvegardée précédemment basée sur sa description.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Mots-clés pour trouver la mémoire (ex: 'voiture rouge')" } }, required: ["searchText"] } }
        ]
    }
],
it: [
    {
        functionDeclarations: [
            { name: "get_current_weather", description: "Ottiene informazioni meteorologiche attuali per una città specificata.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
            { name: "send_email", description: "Invia un'email ORA, ISTANTANEAMENTE. Mai utilizzato per orari futuri. Per programmare, deve essere utilizzato lo strumento schedule_task.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } },
            { name: "schedule_task", description: "Programma/pianifica un'email o promemoria per un orario FUTURO specifico. Se l'utente usa espressioni come 'alle', 'dopo', 'sera', questo strumento DEVE essere selezionato.", parameters: { type: "OBJECT", properties: { time: { type: "STRING", description: "nel formato 'HH:MM'" }, noteName: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["time"] } },
            { name: "create_note", description: "Crea una nuova nota da zero o sovrascrive completamente una nota esistente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
            { name: "edit_note", description: "Aggiunge nuove informazioni alla fine del contenuto di una nota esistente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
            { name: "get_note", description: "Recupera il contenuto di una nota creata precedentemente dal suo nome.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
            { name: "get_current_time", description: "Dice all'utente l'ora e la data attuali.", parameters: { type: "OBJECT", properties: {} } },
            { name: "create_calendar_event", description: "Aggiunge un nuovo evento o appuntamento al calendario dell'utente.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
            { name: "find_memory", description: "Cerca e trova una memoria (immagine, file, ecc.) che l'utente ha salvato precedentemente basandosi sulla sua descrizione.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Parole chiave per trovare la memoria (es: 'auto rossa')" } }, required: ["searchText"] } }
        ]
    }
],
zh: [
    {
        functionDeclarations: [
            { name: "get_current_weather", description: "获取指定城市的当前天气信息。", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
            { name: "send_email", description: "现在、立即发送电子邮件。绝不用于未来时间。对于调度和计划，应使用 schedule_task 工具。", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } },
            { name: "schedule_task", description: "为特定的未来时间安排/计划电子邮件或提醒。如果用户使用'在'、'稍后'、'晚上'等时间表达，必须选择此工具。", parameters: { type: "OBJECT", properties: { time: { type: "STRING", description: "'HH:MM' 格式" }, noteName: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["time"] } },
            { name: "create_note", description: "从头创建全新笔记或完全覆盖现有笔记。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
            { name: "edit_note", description: "在现有笔记内容的末尾添加新信息。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
            { name: "get_note", description: "根据名称检索之前创建的笔记内容。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
            { name: "get_current_time", description: "告诉用户当前时间和日期。", parameters: { type: "OBJECT", properties: {} } },
            { name: "create_calendar_event", description: "向用户的日历添加新事件或约会。", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
            { name: "find_memory", description: "根据描述搜索并找到用户之前保存的记忆（图片、文件等）。", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "查找记忆的关键词（例：'红色汽车'）" } }, required: ["searchText"] } }
        ]
    }
],
de: [
    {
        functionDeclarations: [
            { name: "get_current_weather", description: "Ruft aktuelle Wetterinformationen für eine bestimmte Stadt ab.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
            { name: "send_email", description: "Sendet eine E-Mail JETZT, SOFORT. Nie für zukünftige Zeiten verwendet. Für Terminplanung sollte das schedule_task-Tool verwendet werden.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } },
            { name: "schedule_task", description: "Plant/terminiert eine E-Mail oder Erinnerung für eine bestimmte ZUKÜNFTIGE Zeit. Wenn der Benutzer Zeitausdrücke wie 'um', 'später', 'abends' verwendet, MUSS dieses Tool ausgewählt werden.", parameters: { type: "OBJECT", properties: { time: { type: "STRING", description: "im 'HH:MM' Format" }, noteName: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["time"] } },
            { name: "create_note", description: "Erstellt eine völlig neue Notiz von Grund auf oder überschreibt eine bestehende Notiz vollständig.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
            { name: "edit_note", description: "Fügt neue Informationen am Ende des Inhalts einer bestehenden Notiz hinzu.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
            { name: "get_note", description: "Ruft den Inhalt einer zuvor erstellten Notiz anhand ihres Namens ab.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
            { name: "get_current_time", description: "Teilt dem Benutzer die aktuelle Uhrzeit und das Datum mit.", parameters: { type: "OBJECT", properties: {} } },
            { name: "create_calendar_event", description: "Fügt einen neuen Termin oder Verabredung zum Kalender des Benutzers hinzu.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
            { name: "find_memory", description: "Sucht und findet eine Erinnerung (Bild, Datei, etc.), die der Benutzer zuvor basierend auf ihrer Beschreibung gespeichert hat.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Schlüsselwörter zum Finden der Erinnerung (z.B.: 'rotes Auto')" } }, required: ["searchText"] } }
        ]
    }
],
ru: [
    {
        functionDeclarations: [
            { name: "get_current_weather", description: "Получает текущую информацию о погоде для указанного города.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
            { name: "send_email", description: "Отправляет email СЕЙЧАС, МГНОВЕННО. Никогда не используется для будущего времени. Для планирования следует использовать инструмент schedule_task.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } },
            { name: "schedule_task", description: "Планирует/назначает email или напоминание на определенное БУДУЩЕЕ время. Если пользователь использует выражения времени как 'в', 'позже', 'вечером', этот инструмент ДОЛЖЕН быть выбран.", parameters: { type: "OBJECT", properties: { time: { type: "STRING", description: "в формате 'HH:MM'" }, noteName: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["time"] } },
            { name: "create_note", description: "Создает совершенно новую заметку с нуля или полностью перезаписывает существующую заметку.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
            { name: "edit_note", description: "Добавляет новую информацию в конец содержимого существующей заметки.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
            { name: "get_note", description: "Извлекает содержимое ранее созданной заметки по её имени.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
            { name: "get_current_time", description: "Сообщает пользователю текущее время и дату.", parameters: { type: "OBJECT", properties: {} } },
            { name: "create_calendar_event", description: "Добавляет новое событие или встречу в календарь пользователя.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
            { name: "find_memory", description: "Ищет и находит память (изображение, файл и т.д.), которую пользователь ранее сохранил на основе её описания.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Ключевые слова для поиска памяти (например: 'красная машина')" } }, required: ["searchText"] } }
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
// YENİ KOD (Bu bölümü eski kodun yerine yapıştırın)

// Turbo SDK için gerekli kütüphaneleri ekliyoruz
const { TurboFactory, EthereumSigner } = require("@ardrive/turbo-sdk");
const { ethers } = require("ethers");

/**
 * Verilen bir dosya tamponunu (buffer) Turbo kullanarak Arweave'e yükler.
 * Bu fonksiyon, kullanıcıların resim gibi anılarını yüklemesi için kullanılır.
 * @param {Buffer} fileBuffer Yüklenecek dosyanın buffer'ı.
 * @param {Array} tags Yüklemeye eklenecek etiketler (örn: [{ name: "Content-Type", value: "image/png" }]).
 * @returns Yükleme sonrası makbuz (receipt) nesnesi.
 */
async function uploadFileToTurbo(fileBuffer, tags) {
    try {
        console.log("[Turbo] Dosya yükleme işlemi başlatılıyor...");
        const privateKey = process.env.EVM_PRIVATE_KEY;
        if (!privateKey) throw new Error("EVM_PRIVATE_KEY .env dosyasında bulunamadı.");

        const signer = new EthereumSigner(privateKey);
        const turbo = TurboFactory.authenticated({ signer, token: 'pol' });

        // Turbo SDK'sının upload metodu `data` ve `dataItemOpts` bekler.
        // `dataItemOpts` içine etiketleri (tags) koyarız.
        const response = await turbo.upload({
            data: fileBuffer,
            dataItemOpts: { tags }
        });

        console.log(`✅ Dosya başarıyla Turbo'ya yüklendi. ID: ${response.id}`);
        return response;

    } catch (e) {
        console.error("❌ Dosya Turbo'ya yüklenirken hata oluştu: ", e.message);
        return null;
    }
}

/**
 * Verilen bir metin verisini (genellikle sohbet geçmişi) Turbo kullanarak Arweave'e yükler.
 * @param {Object} data Yüklenecek JSON verisi.
 * @returns Yükleme sonrası makbuz (receipt) nesnesi.
 */
async function uploadTextToTurbo(data) {
    try {
        console.log("[Turbo] Metin verisi yükleme işlemi başlatılıyor...");
        const privateKey = process.env.EVM_PRIVATE_KEY;
        if (!privateKey) throw new Error("EVM_PRIVATE_KEY .env dosyasında bulunamadı.");

        const signer = new EthereumSigner(privateKey);
        const turbo = TurboFactory.authenticated({ signer, token: 'pol' });

        // Metin verisini string haline getirip Buffer'a çeviriyoruz.
        const dataBuffer = Buffer.from(JSON.stringify(data), 'utf-8');
        const tags = [{ name: "Content-Type", value: "application/json" }];

        const response = await turbo.upload({
            data: dataBuffer,
            dataItemOpts: { tags }
        });

        console.log(`✅ Metin verisi başarıyla Turbo'ya yüklendi. ID: ${response.id}`);
        return response;

    } catch (e) {
        console.error("❌ Metin verisi Turbo'ya yüklenirken hata oluştu: ", e.message);
        return null;
    }
}


// Fonksiyonları dışa aktarırken isimlerini server.js'in beklediği şekilde bırakıyoruz.
// Bu sayede server.js dosyasında değişiklik yapmamıza gerek kalmıyor.
module.exports = {
    generateContentFromHistory,
    uploadToIrys: uploadTextToTurbo,       // Eskiden uploadToIrys olan artık uploadTextToTurbo'yu çağırıyor
    uploadFileToIrys: uploadFileToTurbo   // Eskiden uploadFileToIrys olan artık uploadFileToTurbo'yu çağırıyor
};