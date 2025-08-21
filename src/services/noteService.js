// src/services/noteService.js
const { db } = require('../config/database');
const { t } = require('../config/i18n');

const createNote = (noteName, content, lang) => {
    return new Promise((resolve) => {
        const sql = `INSERT OR REPLACE INTO notes (name, content) VALUES (?, ?)`;
        db.run(sql, [noteName, content], function(err) {
            if (err) {
                resolve({ success: false, error: err.message });
            } else {
                resolve({ success: true, message: t('note_saved', lang, {noteName}) });
            }
        });
    });
};

const getNote = (noteName, lang) => {
    return new Promise((resolve) => {
        const sql = `SELECT content FROM notes WHERE name = ?`;
        db.get(sql, [noteName], (err, row) => {
            if (err) {
                resolve({ success: false, error: t('note_db_error', lang) });
            } else if (row) {
                resolve({ success: true, content: row.content || t('note_empty', lang) });
            } else {
                resolve({ success: false, error: t('note_not_found', lang, {noteName}) });
            }
        });
    });
};

const editNote = async (noteName, newContent, lang) => {
    const existing = await getNote(noteName, lang);
    if (!existing.success) {
        return existing; // Return "not found" or "db error"
    }
    const updatedContent = existing.content && existing.content !== t('note_empty', lang)
        ? existing.content + ", " + newContent
        : newContent;
    return createNote(noteName, updatedContent, lang);
};

module.exports = {
    createNote,
    getNote,
    editNote
};