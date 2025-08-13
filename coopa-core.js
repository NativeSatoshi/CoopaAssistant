// coopa-core.js - ÇOK DİLLİ DESTEK EKLENMİŞ NİHAİ SÜRÜM

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Çok dilli sistem talimatları
const systemInstructions = {
    tr: `Sen, Coopa adında yardımsever ve proaktif bir dijital asistansın.
    1. Sohbet: Kullanıcı genel soru sorarsa, ASLA araç kullanma.
    2. Eylem: Kullanıcı bir eylem isterse, uygun aracı MUTLAKA kullan.
    3. find_memory Kuralı: find_memory aracı başarılı bir sonuç döndürdüğünde, cevabın MUTLAKA şu formatta olmalı: "Dosyanı buldum: '[açıklama]'."
    4. Dil Kuralları: Yanıtlarını MUTLAKA Türkçe ver.
    - Kullanıcının e-posta adresi: ${process.env.MY_EMAIL_ADDRESS}.`,
    
    en: `You are Coopa, a helpful and proactive digital assistant.
    1. Chat: If a user asks general questions, NEVER use tools.
    2. Action: If a user requests an action, you MUST use the appropriate tool.
    3. find_memory Rule: When the find_memory tool returns a successful result, your response MUST be in the format: "I found your file: '[description]'."
    4. Language Rules: You MUST respond in English.
    - User's default email address: ${process.env.MY_EMAIL_ADDRESS}.`,
    
    es: `Eres Coopa, un asistente digital útil y proactivo.
    1. Chat: Si un usuario hace preguntas generales, NUNCA uses herramientas.
    2. Acción: Si un usuario solicita una acción, DEBES usar la herramienta apropiada.
    3. Regla de find_memory: Cuando la herramienta find_memory devuelva un resultado exitoso, tu respuesta DEBE tener el formato: "Encontré tu archivo: '[descripción]'."
    4. Reglas de Idioma: DEBES responder en español.
    - Dirección de correo del usuario: ${process.env.MY_EMAIL_ADDRESS}.`,

    fr: `Vous êtes Coopa, un assistant numérique serviable et proactif.
    1. Discussion: Si un utilisateur pose des questions générales, N'UTILISEZ JAMAIS d'outils.
    2. Action: Si un utilisateur demande une action, vous DEVEZ utiliser l'outil approprié.
    3. Règle find_memory: Lorsque l'outil find_memory renvoie un résultat positif, votre réponse DOIT être au format : "J'ai trouvé votre fichier : '[description]'."
    4. Règles linguistiques: Vous DEVEZ répondre en français.
    - Adresse e-mail de l'utilisateur: ${process.env.MY_EMAIL_ADDRESS}.`,

    it: `Sei Coopa, un assistente digitale disponibile e proattivo.
    1. Chat: Se un utente fa domande generiche, NON USARE MAI gli strumenti.
    2. Azione: Se un utente richiede un'azione, DEVI usare lo strumento appropriato.
    3. Regola di find_memory: Quando lo strumento find_memory restituisce un risultato positivo, la tua risposta DEVE essere nel formato: "Ho trovato il tuo file: '[descrizione]'."
    4. Regole sulla lingua: DEVI rispondere in italiano.
    - Indirizzo email dell'utente: ${process.env.MY_EMAIL_ADDRESS}.`,

    zh: `你是 Coopa，一个乐于助人且积极主动的数字助理。
    1. 聊天：如果用户提出一般性问题，绝不要使用工具。
    2. 操作：如果用户请求执行操作，则必须使用适当的工具。
    3. find_memory 规则：当 find_memory 工具成功返回结果时，你的回复格式必须是：“我找到了你的文件：'[描述]'。”
    4. 语言规则：你必须用中文回应。
    - 用户的电子邮件地址：${process.env.MY_EMAIL_ADDRESS}。`,

    de: `Du bist Coopa, ein hilfsbereiter und proaktiver digitaler Assistent.
    1. Chat: Wenn ein Benutzer allgemeine Fragen stellt, verwende NIEMALS Werkzeuge.
    2. Aktion: Wenn ein Benutzer eine Aktion anfordert, MUSST du das entsprechende Werkzeug verwenden.
    3. find_memory-Regel: Wenn das find_memory-Werkzeug ein erfolgreiches Ergebnis zurückgibt, MUSS deine Antwort das Format haben: "Ich habe Ihre Datei gefunden: '[Beschreibung]'."
    4. Sprachregeln: Du MUSST auf Deutsch antworten.
    - E-Mail-Adresse des Benutzers: ${process.env.MY_EMAIL_ADDRESS}.`,

    ru: `Вы Coopa, полезный и инициативный цифровой помощник.
    1. Чат: Если пользователь задает общие вопросы, НИКОГДА не используйте инструменты.
    2. Действие: Если пользователь запрашивает действие, вы ДОЛЖНЫ использовать соответствующий инструмент.
    3. Правило find_memory: Когда инструмент find_memory возвращает успешный результат, ваш ответ ДОЛЖЕН быть в формате: "Я нашел ваш файл: '[описание]'."
    4. Языковые правила: Вы ДОЛЖНЫ отвечать на русском.
    - Адрес электронной почты пользователя: ${process.env.MY_EMAIL_ADDRESS}.`
};

// Çok dilli araç tanımları
const toolsMultilingual = {
    tr: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Belirtilen bir şehirdeki güncel hava durumu bilgisini alır.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { 
                    name: "send_email", 
                    description: "Bir e-postayı ŞİMDİ gönderir. Bir anıyı ek olarak göndermek için 'attachmentDescription' parametresi kullanılır.", 
                    parameters: { 
                        type: "OBJECT", 
                        properties: { 
                            to: { type: "STRING" }, 
                            subject: { type: "STRING" }, 
                            body: { type: "STRING" },
                            attachmentDescription: { type: "STRING", description: "E-postaya eklenecek olan, daha önce kaydedilmiş bir anının açıklaması (örn: 'İstanbul ve Galata')." }
                        }, 
                        required: ["to", "subject", "body"] 
                    } 
                },
                {
                    name: "schedule_task",
                    description: "Bir e-postayı, notu veya dosyayı GELECEKTEKİ belirli bir saat için planlar/zamanlar. Kullanıcı 'saat', 'sonra', 'akşam' gibi bir zaman ifadesi kullanırsa MUTLAKA bu araç seçilmelidir.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            time: { type: "STRING", description: "'HH:MM' formatında" },
                            noteName: { type: "STRING", description: "E-posta ile gönderilecek, önceden kaydedilmiş bir notun adı." },
                            subject: { type: "STRING", description: "Sıfırdan oluşturulacak bir e-postanın konusu." },
                            body: { type: "STRING", description: "Sıfırdan oluşturulacak bir e-postanın içeriği." },
                            attachmentDescription: { type: "STRING", description: "E-postaya eklenecek olan, daha önce kaydedilmiş bir anının (dosyanın) açıklaması." }
                        },
                        required: ["time"]
                    }
                },
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
                { 
                    name: "send_email", 
                    description: "Sends an email NOW. Use the 'attachmentDescription' parameter to send a memory as an attachment.", 
                    parameters: { 
                        type: "OBJECT", 
                        properties: { 
                            to: { type: "STRING" }, 
                            subject: { type: "STRING" }, 
                            body: { type: "STRING" },
                            attachmentDescription: { type: "STRING", description: "The description of a previously saved memory to attach to the email (e.g., 'Istanbul and Galata')." }
                        }, 
                        required: ["to", "subject", "body"] 
                    } 
                },
                {
                    name: "schedule_task",
                    description: "Schedules an email, note, or file for a specific time in the FUTURE. This tool MUST be chosen if the user uses a time expression like 'hour', 'later', 'evening'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            time: { type: "STRING", description: "in 'HH:MM' format" },
                            noteName: { type: "STRING", description: "The name of a pre-saved note to be sent via email." },
                            subject: { type: "STRING", description: "The subject of an email to be created from scratch." },
                            body: { type: "STRING", description: "The content of an email to be created from scratch." },
                            attachmentDescription: { type: "STRING", description: "The description of a previously saved memory (file) to be attached to the email." }
                        },
                        required: ["time"]
                    }
                },
                { name: "create_note", description: "Creates a new note from scratch or completely overwrites an existing note.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Adds new information to the end of an existing note's content.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Retrieves the content of a previously created note by name.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
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
                { name: "get_current_weather", description: "Obtiene información meteorológica actual para una ciudad especificada.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                {
                    name: "send_email",
                    description: "Envía un correo electrónico AHORA. Use el parámetro 'attachmentDescription' para enviar un recuerdo como adjunto.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            to: { type: "STRING" },
                            subject: { type: "STRING" },
                            body: { type: "STRING" },
                            attachmentDescription: { type: "STRING", description: "La descripción de un recuerdo guardado previamente para adjuntar al correo (ej. 'Estambul y Gálata')." }
                        },
                        required: ["to", "subject", "body"]
                    }
                },
                {
                    name: "schedule_task",
                    description: "Programa un correo electrónico, nota o archivo para una hora específica en el FUTURO. Esta herramienta DEBE elegirse si el usuario utiliza una expresión de tiempo como 'hora', 'más tarde', 'noche'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            time: { type: "STRING", description: "en formato 'HH:MM'" },
                            noteName: { type: "STRING", description: "El nombre de una nota pre-guardada que se enviará por correo electrónico." },
                            subject: { type: "STRING", description: "El asunto de un correo electrónico que se creará desde cero." },
                            body: { type: "STRING", description: "El contenido de un correo electrónico que se creará desde cero." },
                            attachmentDescription: { type: "STRING", description: "La descripción de un recuerdo (archivo) guardado previamente que se adjuntará al correo electrónico." }
                        },
                        required: ["time"]
                    }
                },
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
                {
                    name: "send_email",
                    description: "Envoie un e-mail MAINTENANT. Utilisez le paramètre 'attachmentDescription' pour envoyer un souvenir en pièce jointe.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            to: { type: "STRING" },
                            subject: { type: "STRING" },
                            body: { type: "STRING" },
                            attachmentDescription: { type: "STRING", description: "La description d'un souvenir enregistré précédemment à joindre à l'e-mail (par ex. 'Istanbul et Galata')." }
                        },
                        required: ["to", "subject", "body"]
                    }
                },
                {
                    name: "schedule_task",
                    description: "Planifie un e-mail, une note ou un fichier pour une heure spécifique dans le FUTUR. Cet outil DOIT être choisi si l'utilisateur utilise une expression temporelle comme 'heure', 'plus tard', 'soir'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            time: { type: "STRING", description: "au format 'HH:MM'" },
                            noteName: { type: "STRING", description: "Le nom d'une note pré-enregistrée à envoyer par e-mail." },
                            subject: { type: "STRING", description: "L'objet d'un e-mail à créer à partir de zéro." },
                            body: { type: "STRING", description: "Le contenu d'un e-mail à créer à partir de zéro." },
                            attachmentDescription: { type: "STRING", description: "La description d'un souvenir (fichier) précédemment enregistré à joindre à l'e-mail." }
                        },
                        required: ["time"]
                    }
                },
                { name: "create_note", description: "Crée une nouvelle note à partir de zéro ou écrase complètement une note existante.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Ajoute de nouvelles informations à la fin du contenu d'une note existante.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Récupère le contenu d'une note créée précédemment par son nom.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Dit à l'utilisateur l'heure et la date actuelles.", parameters: { type: "OBJECT", properties: {} } },
                { name: "create_calendar_event", description: "Ajoute un nouvel événement ou rendez-vous au calendrier de l'utilisateur.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
                {
                    name: "find_memory",
                    description: "Recherche et trouve une mémoire (image, fichier, etc.) que l'utilisateur a sauvegardée précédemment basée sur sa description. Utilisé pour des commandes comme '... montrer', '... trouver', '... obtenir'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            searchText: { type: "STRING", description: "Mots-clés pour trouver la mémoire (ex: 'voiture rouge')" }
                        },
                        required: ["searchText"]
                    }
                }
            ]
        }
    ],
    it: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Ottiene informazioni meteorologiche attuali per una città specificata.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                {
                    name: "send_email",
                    description: "Invia un'e-mail ORA. Usa il parametro 'attachmentDescription' per inviare un ricordo come allegato.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            to: { type: "STRING" },
                            subject: { type: "STRING" },
                            body: { type: "STRING" },
                            attachmentDescription: { type: "STRING", description: "La descrizione di un ricordo salvato in precedenza da allegare all'e-mail (es. 'Istanbul e Galata')." }
                        },
                        required: ["to", "subject", "body"]
                    }
                },
                {
                    name: "schedule_task",
                    description: "Pianifica un'e-mail, una nota o un file per un'ora specifica nel FUTURO. Questo strumento DEVE essere scelto se l'utente utilizza un'espressione di tempo come 'ora', 'più tardi', 'sera'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            time: { type: "STRING", description: "in formato 'HH:MM'" },
                            noteName: { type: "STRING", description: "Il nome di una nota pre-salvata da inviare via e-mail." },
                            subject: { type: "STRING", description: "L'oggetto di un'e-mail da creare da zero." },
                            body: { type: "STRING", description: "Il contenuto di un'e-mail da creare da zero." },
                            attachmentDescription: { type: "STRING", description: "La descrizione di un ricordo (file) salvato in precedenza da allegare all'e-mail." }
                        },
                        required: ["time"]
                    }
                },
                { name: "create_note", description: "Crea una nuova nota da zero o sovrascrive completamente una nota esistente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Aggiunge nuove informazioni alla fine del contenuto di una nota esistente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Recupera il contenuto di una nota creata precedentemente dal suo nome.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Dice all'utente l'ora e la data attuali.", parameters: { type: "OBJECT", properties: {} } },
                { name: "create_calendar_event", description: "Aggiunge un nuovo evento o appuntamento al calendario dell'utente.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
                {
                    name: "find_memory",
                    description: "Cerca e trova una memoria (immagine, file, ecc.) che l'utente ha salvato precedentemente basandosi sulla sua descrizione. Usato per comandi come '... mostra', '... trova', '... ottieni'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            searchText: { type: "STRING", description: "Parole chiave per trovare la memoria (es: 'auto rossa')" }
                        },
                        required: ["searchText"]
                    }
                }
            ]
        }
    ],
    zh: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "获取指定城市的当前天气信息。", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                {
                    name: "send_email",
                    description: "立即发送电子邮件。使用“attachmentDescription”参数将记忆作为附件发送。",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            to: { type: "STRING" },
                            subject: { type: "STRING" },
                            body: { type: "STRING" },
                            attachmentDescription: { type: "STRING", description: "要附加到电子邮件的先前保存的记忆的描述（例如，'伊斯坦布尔和加拉太'）。" }
                        },
                        required: ["to", "subject", "body"]
                    }
                },
                {
                    name: "schedule_task",
                    description: "为将来的特定时间安排电子邮件、笔记或文件。如果用户使用像“小时”、“稍后”、“晚上”这样的时间表达，则必须选择此工具。",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            time: { type: "STRING", description: "格式为“HH:MM”" },
                            noteName: { type: "STRING", description: "要通过电子邮件发送的预存笔记的名称。" },
                            subject: { type: "STRING", description: "要从头创建的电子邮件的主题。" },
                            body: { type: "STRING", description: "要从头创建的电子邮件的内容。" },
                            attachmentDescription: { type: "STRING", description: "要附加到电子邮件的先前保存的记忆（文件）的描述。" }
                        },
                        required: ["time"]
                    }
                },
                { name: "create_note", description: "从头开始创建新笔记或完全覆盖现有笔记。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "在现有笔记内容的末尾添加新信息。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "按名称检索先前创建的笔记的内容。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "告诉用户当前的时间和日期。", parameters: { type: "OBJECT", properties: {} } },
                { name: "create_calendar_event", description: "将新活动添加到用户的日历中。", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
                {
                    name: "find_memory",
                    description: "根据描述搜索并找到用户先前保存的记忆（图片、文件等）。用于“...显示”、“...查找”、“...获取”等命令。",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            searchText: { type: "STRING", description: "用于查找记忆的关键字（例如：'红色汽车'）" }
                        },
                        required: ["searchText"]
                    }
                }
            ]
        }
    ],
    de: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Ruft aktuelle Wetterinformationen für eine bestimmte Stadt ab.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                {
                    name: "send_email",
                    description: "Sendet JETZT eine E-Mail. Verwenden Sie den Parameter 'attachmentDescription', um eine Erinnerung als Anhang zu senden.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            to: { type: "STRING" },
                            subject: { type: "STRING" },
                            body: { type: "STRING" },
                            attachmentDescription: { type: "STRING", description: "Die Beschreibung einer zuvor gespeicherten Erinnerung, die an die E-Mail angehängt werden soll (z. B. 'Istanbul und Galata')." }
                        },
                        required: ["to", "subject", "body"]
                    }
                },
                {
                    name: "schedule_task",
                    description: "Plant eine E-Mail, eine Notiz oder eine Datei für eine bestimmte Zeit in der ZUKUNFT. Dieses Werkzeug MUSS ausgewählt werden, wenn der Benutzer einen Zeitausdruck wie 'Stunde', 'später', 'Abend' verwendet.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            time: { type: "STRING", description: "im Format 'HH:MM'" },
                            noteName: { type: "STRING", description: "Der Name einer vorgespeicherten Notiz, die per E-Mail gesendet werden soll." },
                            subject: { type: "STRING", description: "Der Betreff einer von Grund auf neu zu erstellenden E-Mail." },
                            body: { type: "STRING", description: "Der Inhalt einer von Grund auf neu zu erstellenden E-Mail." },
                            attachmentDescription: { type: "STRING", description: "Die Beschreibung einer zuvor gespeicherten Erinnerung (Datei), die an die E-Mail angehängt werden soll." }
                        },
                        required: ["time"]
                    }
                },
                { name: "create_note", description: "Erstellt eine neue Notiz von Grund auf oder überschreibt eine bestehende Notiz vollständig.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Fügt neue Informationen am Ende des Inhalts einer bestehenden Notiz hinzu.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Ruft den Inhalt einer zuvor erstellten Notiz anhand ihres Namens ab.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Teilt dem Benutzer die aktuelle Uhrzeit und das aktuelle Datum mit.", parameters: { type: "OBJECT", properties: {} } },
                { name: "create_calendar_event", description: "Fügt dem Kalender des Benutzers ein neues Ereignis oder einen neuen Termin hinzu.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
                {
                    name: "find_memory",
                    description: "Sucht und findet eine Erinnerung (Bild, Datei usw.), die der Benutzer zuvor anhand ihrer Beschreibung gespeichert hat. Wird für Befehle wie '... anzeigen', '... finden', '... holen' verwendet.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            searchText: { type: "STRING", description: "Schlüsselwörter zum Finden der Erinnerung (z.B.: 'rotes Auto')" }
                        },
                        required: ["searchText"]
                    }
                }
            ]
        }
    ],
    ru: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Получает текущую информацию о погоде для указанного города.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                {
                    name: "send_email",
                    description: "Отправляет электронное письмо СЕЙЧАС. Используйте параметр 'attachmentDescription', чтобы отправить воспоминание в качестве вложения.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            to: { type: "STRING" },
                            subject: { type: "STRING" },
                            body: { type: "STRING" },
                            attachmentDescription: { type: "STRING", description: "Описание ранее сохраненного воспоминания для прикрепления к электронному письму (например, «Стамбул и Галата»)." }
                        },
                        required: ["to", "subject", "body"]
                    }
                },
                {
                    name: "schedule_task",
                    description: "Планирует электронное письмо, заметку или файл на определенное время в БУДУЩЕМ. Этот инструмент ОБЯЗАТЕЛЬНО должен быть выбран, если пользователь использует временное выражение, такое как 'час', 'позже', 'вечер'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            time: { type: "STRING", description: "в формате «ЧЧ:ММ»" },
                            noteName: { type: "STRING", description: "Имя предварительно сохраненной заметки для отправки по электронной почте." },
                            subject: { type: "STRING", description: "Тема электронного письма, создаваемого с нуля." },
                            body: { type: "STRING", description: "Содержимое электронного письма, создаваемого с нуля." },
                            attachmentDescription: { type: "STRING", description: "Описание ранее сохраненного воспоминания (файла) для прикрепления к электронному письму." }
                        },
                        required: ["time"]
                    }
                },
                { name: "create_note", description: "Создает новую заметку с нуля или полностью перезаписывает существующую заметку.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Добавляет новую информацию в конец содержимого существующей заметки.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Извлекает содержимое ранее созданной заметки по ее названию.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Сообщает пользователю текущее время и дату.", parameters: { type: "OBJECT", properties: {} } },
                { name: "create_calendar_event", description: "Добавляет новое событие или встречу в календарь пользователя.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } },
                {
                    name: "find_memory",
                    description: "Ищет и находит воспоминание (изображение, файл и т.д.), которое пользователь ранее сохранил, на основе его описания. Используется для команд типа '... покажи', '... найди', '... получи'.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            searchText: { type: "STRING", description: "Ключевые слова для поиска воспоминания (например: 'красная машина')" }
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