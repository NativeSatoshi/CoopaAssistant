// src/api/controllers/chatController.js
const geminiService = require('../../services/geminiService');
const arweaveService = require('../../services/arweaveService');
const toolHandler = require('../../services/toolHandler');
const { t } = require('../../config/i18n');

// src/api/controllers/chatController.js içine

// Demo modu için özel yanıt (30 DİL DESTEKLİ)
const getDemoResponse = (lang) => {
  // 1. Adım: .env dosyasındaki e-posta adresini oku
  const contactEmail = process.env.CONTACT_EMAIL;
  
  // 2. Adım: Her dil için iletişim metnini oluştur
  // (Eğer e-posta adresi .env'de tanımlı değilse bu bölüm hiç görünmeyecek)
  const contactLine = {
    tr: contactEmail ? `\n\nTam erişim için bizimle iletişime geçin: **${contactEmail}**` : '',
    en: contactEmail ? `\n\nFor full access, contact us at: **${contactEmail}**` : '',
    zh: contactEmail ? `\n\n如需完整访问权限，请联系我们：**${contactEmail}**` : '',
    hi: contactEmail ? `\n\nपूर्ण पहुंच के लिए, हमसे यहां संपर्क करें: **${contactEmail}**` : '',
    es: contactEmail ? `\n\nPara acceso completo, contáctenos en: **${contactEmail}**` : '',
    fr: contactEmail ? `\n\nPour un accès complet, contactez-nous à : **${contactEmail}**` : '',
    ar: contactEmail ? `\n\nللوصول الكامل، تواصل معنا على: **${contactEmail}**` : '',
    bn: contactEmail ? `\n\nসম্পূর্ণ অ্যাক্সেসের জন্য আমাদের সাথে যোগাযোগ করুন: **${contactEmail}**` : '',
    ru: contactEmail ? `\n\nДля полного доступа свяжитесь с нами по адресу: **${contactEmail}**` : '',
    pt: contactEmail ? `\n\nPara acesso total, entre em contato conosco em: **${contactEmail}**` : '',
    ur: contactEmail ? `\n\nمکمل رسائی کے لیے ہم سے رابطہ کریں: **${contactEmail}**` : '',
    ms: contactEmail ? `\n\nUntuk akses penuh, hubungi kami di: **${contactEmail}**` : '',
    de: contactEmail ? `\n\nFür vollen Zugriff kontaktieren Sie uns unter: **${contactEmail}**` : '',
    ja: contactEmail ? `\n\nフルアクセスをご希望の場合は、こちらまでご連絡ください: **${contactEmail}**` : '',
    fa: contactEmail ? `\n\nبرای دسترسی کامل، با ما در تماس باشید: **${contactEmail}**` : '',
    ha: contactEmail ? `\n\nDon samun cikakken damar, tuntuɓe mu a: **${contactEmail}**` : '',
    sw: contactEmail ? `\n\nKwa ufikiaji kamili, wasiliana nasi kwa: **${contactEmail}**` : '',
    vi: contactEmail ? `\n\nĐể có quyền truy cập đầy đủ, liên hệ với chúng tôi tại: **${contactEmail}**` : '',
    ko: contactEmail ? `\n\n전체 액세스를 위해 다음 주소로 연락해 주세요: **${contactEmail}**` : '',
    it: contactEmail ? `\n\nPer l'accesso completo, contattaci a: **${contactEmail}**` : '',
    jv: contactEmail ? `\n\nKanggo akses lengkap, hubungi kita ing: **${contactEmail}**` : '',
    tl: contactEmail ? `\n\nPara sa kumpletong access, makipag-ugnayan sa amin sa: **${contactEmail}**` : '',
    uz: contactEmail ? `\n\nTo'liq kirish uchun biz bilan bog'laning: **${contactEmail}**` : '',
    nl: contactEmail ? `\n\nVoor volledige toegang, neem contact met ons op via: **${contactEmail}**` : '',
    el: contactEmail ? `\n\nΓια πλήρη πρόσβαση, επικοινωνήστε μαζί μας στο: **${contactEmail}**` : '',
    sv: contactEmail ? `\n\nFör fullständig åtkomst, kontakta oss på: **${contactEmail}**` : '',
    he: contactEmail ? `\n\nלגישה מלאה, צרו קשר איתנו בכתובת: **${contactEmail}**` : '',
    da: contactEmail ? `\n\nFor fuld adgang, kontakt os på: **${contactEmail}**` : '',
    fi: contactEmail ? `\n\nTäyden käyttöoikeuden saamiseksi, ota yhteyttä: **${contactEmail}**` : '',
    no: contactEmail ? `\n\nFor full tilgang, kontakt oss på: **${contactEmail}**` : ''
  };

  const demoMessages = {
    tr: `🔒 **COOPA AI Demo Modu**

Merhaba! Bu COOPA AI'nın halka açık demo versiyonu.

**Demo'da kullanabileceğiniz özellikler:**
✅ Cüzdan bağlantısı
✅ Arayüz keşfi

**Admin erişimi ile mevcut özellikler:**
🔒 AI destekli akıllı sohbet
🔒 Arweave entegrasyonu
🔒 Akıllı araçlar (hava durumu, notlar, takvim)${contactLine.tr || contactLine.en}`,

    en: `🔒 **COOPA AI Demo Mode**

Hello! This is the public demo version of COOPA AI.

**Available features in demo:**
✅ Wallet connection
✅ Interface exploration

**Features available with admin access:**
🔒 AI-powered smart chat
🔒 Arweave integration
🔒 Smart tools (weather, notes, calendar)${contactLine.en}`,

    zh: `🔒 **COOPA AI 演示模式**

你好！这是 COOPA AI 的公开演示版本。

**演示中可用的功能：**
✅ 钱包连接
✅ 界面探索

**管理员权限可用的功能：**
🔒 AI 驱动的智能聊天
🔒 Arweave 集成
🔒 智能工具（天气、笔记、日历）${contactLine.zh || contactLine.en}`,

    hi: `🔒 **कूपा एआई डेमो मोड**

नमस्ते! यह कूपा एआई का सार्वजनिक डेमो संस्करण है।

**डेमो में उपलब्ध सुविधाएँ:**
✅ वॉलेट कनेक्शन
✅ इंटरफ़ेस अन्वेषण

**व्यवस्थापक पहुँच के साथ उपलब्ध सुविधाएँ:**
🔒 एआई-संचालित स्मार्ट चैट
🔒 आर्वीव एकीकरण
🔒 स्मार्ट उपकरण (मौसम, नोट्स, कैलेंडर)${contactLine.hi || contactLine.en}`,

    es: `🔒 **COOPA AI Modo Demo**

¡Hola! Esta es la versión demo pública de COOPA AI.

**Características disponibles en la demo:**
✅ Conexión de billetera
✅ Exploración de la interfaz

**Características disponibles con acceso de administrador:**
🔒 Chat inteligente con IA
🔒 Integración con Arweave
🔒 Herramientas inteligentes (clima, notas, calendario)${contactLine.es || contactLine.en}`,

    fr: `🔒 **COOPA AI Mode Démo**

Bonjour ! Ceci est la version démo publique de COOPA AI.

**Fonctionnalités disponibles en démo :**
✅ Connexion du portefeuille
✅ Exploration de l'interface

**Fonctionnalités disponibles avec l'accès administrateur :**
🔒 Chat intelligent alimenté par l'IA
🔒 Intégration Arweave
🔒 Outils intelligents (météo, notes, calendrier)${contactLine.fr || contactLine.en}`,

    ar: `🔒 **وضع عرض كوبا الذكي**

مرحباً! هذه النسخة التجريبية العامة من كوبا الذكي.

**الميزات المتاحة في العرض التجريبي:**
✅ ربط المحفظة
✅ استكشاف الواجهة

**الميزات المتاحة مع وصول المدير:**
🔒 دردشة ذكية مدعومة بالذكاء الاصطناعي
🔒 تكامل أرويف
🔒 أدوات ذكية (الطقس، الملاحظات، التقويم)${contactLine.ar || contactLine.en}`,

    bn: `🔒 **কূপা এআই ডেমো মোড**

হ্যালো! এটি কূপা এআই-এর পাবলিক ডেমো সংস্করণ।

**ডেমোতে উপলব্ধ বৈশিষ্ট্যসমূহ:**
✅ ওয়ালেট সংযোগ
✅ ইন্টারফেস অন্বেষণ

**অ্যাডমিন অ্যাক্সেসের সাথে উপলব্ধ বৈশিষ্ট্যসমূহ:**
🔒 এআই-চালিত স্মার্ট চ্যাট
🔒 আরউইভ ইন্টিগ্রেশন
🔒 স্মার্ট টুলস (আবহাওয়া, নোট, ক্যালেন্ডার)${contactLine.bn || contactLine.en}`,

    ru: `🔒 **COOPA AI Демо-режим**

Здравствуйте! Это публичная демо-версия COOPA AI.

**Доступные функции в демо:**
✅ Подключение кошелька
✅ Исследование интерфейса

**Функции, доступные с правами администратора:**
🔒 Умный чат на базе ИИ
🔒 Интеграция с Arweave
🔒 Умные инструменты (погода, заметки, календарь)${contactLine.ru || contactLine.en}`,

    pt: `🔒 **COOPA AI Modo de Demonstração**

Olá! Esta é a versão de demonstração pública do COOPA AI.

**Recursos disponíveis na demonstração:**
✅ Conexão da carteira
✅ Exploração da interface

**Recursos disponíveis com acesso de administrador:**
🔒 Chat inteligente com IA
🔒 Integração com Arweave
🔒 Ferramentas inteligentes (clima, notas, calendário)${contactLine.pt || contactLine.en}`,

    ur: `🔒 **کوپا اے آئی ڈیمو موڈ**

السلام علیکم! یہ کوپا اے آئی کا عوامی ڈیمو ورژن ہے۔

**ڈیمو میں دستیاب فیچرز:**
✅ والیٹ کنکشن
✅ انٹرفیس کی تلاش

**ایڈمن رسائی کے ساتھ دستیاب فیچرز:**
🔒 اے آئی پاور اسمارٹ چیٹ
🔒 آرویو انٹیگریشن
🔒 اسمارٹ ٹولز (موسم، نوٹس، کیلنڈر)${contactLine.ur || contactLine.en}`,

    ms: `🔒 **COOPA AI Mod Demo**

Halo! Ini adalah versi demo awam COOPA AI.

**Ciri-ciri yang tersedia dalam demo:**
✅ Sambungan dompet
✅ Penerokaan antara muka

**Ciri-ciri yang tersedia dengan akses admin:**
🔒 Sembang pintar dikuasakan AI
🔒 Integrasi Arweave
🔒 Alat pintar (cuaca, nota, kalendar)${contactLine.ms || contactLine.en}`,

    de: `🔒 **COOPA AI Demo-Modus**

Hallo! Dies ist die öffentliche Demo-Version von COOPA AI.

**In der Demo verfügbare Funktionen:**
✅ Wallet-Verbindung
✅ Interface-Erkundung

**Mit Admin-Zugang verfügbare Funktionen:**
🔒 KI-gestützter Smart-Chat
🔒 Arweave-Integration
🔒 Intelligente Werkzeuge (Wetter, Notizen, Kalender)${contactLine.de || contactLine.en}`,

    ja: `🔒 **COOPA AI デモモード**

こんにちは！これはCOOPA AIのパブリックデモ版です。

**デモで利用可能な機能：**
✅ ウォレット接続
✅ インターフェース探索

**管理者アクセスで利用可能な機能：**
🔒 AI搭載スマートチャット
🔒 Arweave統合
🔒 スマートツール（天気、メモ、カレンダー）${contactLine.ja || contactLine.en}`,

    fa: `🔒 **حالت نمایشی کوپا AI**

سلام! این نسخه نمایشی عمومی کوپا AI است.

**امکانات موجود در نمایش:**
✅ اتصال کیف پول
✅ کاوش رابط کاربری

**امکانات موجود با دسترسی مدیر:**
🔒 گفتگوی هوشمند مبتنی بر هوش مصنوعی
🔒 یکپارچگی آرویو
🔒 ابزارهای هوشمند (آب و هوا، یادداشت‌ها، تقویم)${contactLine.fa || contactLine.en}`,

    ha: `🔒 **COOPA AI Yanayin Demo**

Sannu! Wannan shine sigar demo na jama'a na COOPA AI.

**Abubuwan da ke samuwa a demo:**
✅ Haɗin walat
✅ Binciken interface

**Abubuwan da ke samuwa tare da samun admin:**
🔒 Hira mai hankali da AI
🔒 Haɗakar Arweave
🔒 Kayan aikin hankali (yanayi, bayanai, kalanda)${contactLine.ha || contactLine.en}`,

    sw: `🔒 **Hali ya Onyesho ya COOPA AI**

Hujambo! Hii ni toleo la onyesho la umma la COOPA AI.

**Vipengele vinavyopatikana katika onyesho:**
✅ Muunganisho wa pochi
✅ Uchunguzi wa kiolesura

**Vipengele vinavyopatikana na ufikiaji wa msimamizi:**
🔒 Mazungumzo mahiri yanayoendeshwa na AI
🔒 Uunganisho wa Arweave
🔒 Zana mahiri (hali ya hewa, maelezo, kalenda)${contactLine.sw || contactLine.en}`,

    vi: `🔒 **Chế độ Demo COOPA AI**

Xin chào! Đây là phiên bản demo công khai của COOPA AI.

**Tính năng có sẵn trong demo:**
✅ Kết nối ví
✅ Khám phá giao diện

**Tính năng có sẵn với quyền truy cập quản trị:**
🔒 Trò chuyện thông minh hỗ trợ AI
🔒 Tích hợp Arweave
🔒 Công cụ thông minh (thời tiết, ghi chú, lịch)${contactLine.vi || contactLine.en}`,

    ko: `🔒 **COOPA AI 데모 모드**

안녕하세요! 이것은 COOPA AI의 공개 데모 버전입니다.

**데모에서 사용 가능한 기능:**
✅ 지갑 연결
✅ 인터페이스 탐색

**관리자 액세스로 사용 가능한 기능:**
🔒 AI 기반 스마트 채팅
🔒 Arweave 통합
🔒 스마트 도구 (날씨, 메모, 캘린더)${contactLine.ko || contactLine.en}`,

    it: `🔒 **COOPA AI Modalità Demo**

Ciao! Questa è la versione demo pubblica di COOPA AI.

**Funzionalità disponibili nella demo:**
✅ Connessione portafoglio
✅ Esplorazione interfaccia

**Funzionalità disponibili con accesso admin:**
🔒 Chat intelligente basata su IA
🔒 Integrazione Arweave
🔒 Strumenti intelligenti (meteo, note, calendario)${contactLine.it || contactLine.en}`,

    jv: `🔒 **Mode Demo COOPA AI**

Halo! Iki versi demo umum saka COOPA AI.

**Fitur sing kasedhiya ing demo:**
✅ Sambungan dompet
✅ Eksplorasi antarmuka

**Fitur sing kasedhiya karo akses admin:**
🔒 Obrolan pinter didhukung AI
🔒 Integrasi Arweave
🔒 Alat pinter (cuaca, cathetan, tanggalan)${contactLine.jv || contactLine.en}`,

    tl: `🔒 **COOPA AI Demo Mode**

Kumusta! Ito ang pampublikong demo version ng COOPA AI.

**Available na features sa demo:**
✅ Wallet connection
✅ Interface exploration

**Features na available sa admin access:**
🔒 AI-powered na smart chat
🔒 Arweave integration
🔒 Smart tools (panahon, mga tala, kalendaryo)${contactLine.tl || contactLine.en}`,

    uz: `🔒 **COOPA AI Demo Rejimi**

Salom! Bu COOPA AI ning ommaviy demo versiyasi.

**Demoda mavjud xususiyatlar:**
✅ Hamyon ulanishi
✅ Interfeys o'rganish

**Admin kirish bilan mavjud xususiyatlar:**
🔒 AI tomonidan boshqariladigan aqlli chat
🔒 Arweave integratsiyasi
🔒 Aqlli vositalar (ob-havo, eslatmalar, taqvim)${contactLine.uz || contactLine.en}`,

    nl: `🔒 **COOPA AI Demo Modus**

Hallo! Dit is de openbare demo versie van COOPA AI.

**Beschikbare functies in demo:**
✅ Wallet verbinding
✅ Interface verkenning

**Functies beschikbaar met admin toegang:**
🔒 AI-aangedreven slimme chat
🔒 Arweave integratie
🔒 Slimme tools (weer, notities, kalender)${contactLine.nl || contactLine.en}`,

    el: `🔒 **Λειτουργία Demo COOPA AI**

Γεια σας! Αυτή είναι η δημόσια έκδοση demo του COOPA AI.

**Διαθέσιμες λειτουργίες στο demo:**
✅ Σύνδεση πορτοφολιού
✅ Εξερεύνηση διεπαφής

**Λειτουργίες διαθέσιμες με πρόσβαση διαχειριστή:**
🔒 Έξυπνη συνομιλία με τεχνητή νοημοσύνη
🔒 Ενσωμάτωση Arweave
🔒 Έξυπνα εργαλεία (καιρός, σημειώσεις, ημερολόγιο)${contactLine.el || contactLine.en}`,

    sv: `🔒 **COOPA AI Demo-läge**

Hej! Detta är den offentliga demo-versionen av COOPA AI.

**Tillgängliga funktioner i demon:**
✅ Plånboksanslutning
✅ Gränssnittsutforskning

**Funktioner tillgängliga med admin-åtkomst:**
🔒 AI-driven smart chatt
🔒 Arweave-integration
🔒 Smarta verktyg (väder, anteckningar, kalender)${contactLine.sv || contactLine.en}`,

    he: `🔒 **מצב הדגמה של COOPA AI**

שלום! זו גרסת הדגמה ציבורית של COOPA AI.

**תכונות זמינות בהדגמה:**
✅ חיבור ארנק
✅ חקר ממשק

**תכונות זמינות עם גישת מנהל:**
🔒 צ'אט חכם מונע בינה מלאכותית
🔒 אינטגרציה של Arweave
🔒 כלים חכמים (מזג אוויר, הערות, יומן)${contactLine.he || contactLine.en}`,

    da: `🔒 **COOPA AI Demo Tilstand**

Hej! Dette er den offentlige demo version af COOPA AI.

**Tilgængelige funktioner i demo:**
✅ Tegnebogsforbindelse
✅ Interface udforskning

**Funktioner tilgængelige med admin adgang:**
🔒 AI-drevet smart chat
🔒 Arweave integration
🔒 Smarte værktøjer (vejr, noter, kalender)${contactLine.da || contactLine.en}`,

    fi: `🔒 **COOPA AI Demo-tila**

Hei! Tämä on COOPA AI:n julkinen demo-versio.

**Demossa käytettävissä olevat ominaisuudet:**
✅ Lompakkoyhteys
✅ Käyttöliittymän tutkiminen

**Järjestelmänvalvojan käyttöoikeuksilla käytettävissä olevat ominaisuudet:**
🔒 Tekoälyavusteinen älykäs keskustelu
🔒 Arweave-integraatio
🔒 Älykkäät työkalut (sää, muistiinpanot, kalenteri)${contactLine.fi || contactLine.en}`,

    no: `🔒 **COOPA AI Demo Modus**

Hei! Dette er den offentlige demo-versjonen av COOPA AI.

**Tilgjengelige funksjoner i demo:**
✅ Lommebokkobling
✅ Grensesnittutforskning

**Funksjoner tilgjengelige med admin-tilgang:**
🔒 AI-drevet smart chat
🔒 Arweave-integrasjon
🔒 Smarte verktøy (vær, notater, kalender)${contactLine.no || contactLine.en}`
  };

  return {
    role: "model",
    parts: [{ text: demoMessages[lang] || demoMessages['en'] }]
  };
};

// Ana chat mantığı
const generateResponse = async (req, res) => {
    const { prompt, history, userAddress, signature } = req.body;
    const lang = req.lang;

    // Demo modu kontrolü
    const adminAddresses = (process.env.ADMIN_WALLET_ADDRESS || '').toLowerCase().split(',');
    if (!adminAddresses.includes(userAddress.toLowerCase())) {
        const demoResponse = getDemoResponse(lang);
        const demoHistory = [...(history || []), { role: "user", parts: [{ text: prompt }] }, demoResponse];
        return res.json({ history: demoHistory, displayData: null });
    }

    try {
        if (!prompt) return res.status(400).json({ error: t('prompt_empty', lang) });

        let currentHistory = [...(history || []), { role: "user", parts: [{ text: prompt }] }];
        let displayData = null;

        while (true) {
            const result = await geminiService.generateContentFromHistory(currentHistory, lang);
            const candidate = result.response?.candidates?.[0];

            if (!candidate || !candidate.content?.parts?.[0]) {
                throw new Error(t('invalid_ai_response', lang));
            }

            const part = candidate.content.parts[0];
            currentHistory.push({ role: "model", parts: [part] });

            if (part.functionCall) {
                console.log(`[Tool Call] -> ${part.functionCall.name}`);
                const { toolResult, newDisplayData } = await toolHandler.handleToolCall(part.functionCall, { userAddress, signature, lang });

                if (newDisplayData) {
                    displayData = newDisplayData;
                }

                currentHistory.push({ role: "function", parts: [{ functionResponse: { name: part.functionCall.name, response: { result: toolResult } } }] });

                // --- DEĞİŞİKLİK BURADA ---
                // Yapay zekanın kafasını karıştıran, bizim manuel eklediğimiz
                // "görev tamamlandı" mesajını sohbet geçmişinden kaldırıyoruz.
                // Artık sadece aracın sonucunu ekleyip, son cevabı tamamen yapay zekanın üretmesini bekleyeceğiz.
                /*
                if (toolResult.success && resultForHistory) {
                     currentHistory.push({ role: "model", parts: [{ text: resultForHistory }] });
                }
                */
               // YUKARIDAKİ BLOK KALDIRILDI.

            } else {
                break; // No more function calls, exit loop
            }
        }

        arweaveService.uploadTextToArweave(currentHistory.slice(-2));
        res.json({ history: currentHistory, displayData });

    } catch (error) {
        console.error("❌ /generate route error:", error.message);
        const errHistory = [...(req.body.history || []), { role: "user", parts: [{ text: req.body.prompt }] }, { role: "model", parts: [{ text: t('server_error', lang) }] }];
        res.status(500).json({ history: errHistory });
    }
};

module.exports = {
    generateResponse
};