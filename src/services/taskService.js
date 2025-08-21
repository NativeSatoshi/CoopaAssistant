// src/services/taskService.js
const cron = require('node-cron');
const emailService = require('./emailService');
const noteService = require('./noteService');
const { t } = require('../config/i18n');

async function scheduleTask(args, userAddress, signature, lang) {
    const { time, noteName, subject, body, attachmentDescription } = args;

    if (!time) return { success: false, message: t('task_missing_time', lang) };

    const [hour, minute] = time.split(':');
    if (isNaN(hour) || isNaN(minute)) {
        return { success: false, message: t('task_invalid_time', lang) };
    }

    const cronTime = `${minute} ${hour} * * *`;
    const taskIdentifier = noteName || attachmentDescription || subject || 'Task';
    console.log(`[Scheduler] Setting up task. CronTime: ${cronTime}, Identifier: '${taskIdentifier}'`);

    const task = cron.schedule(cronTime, async () => {
        console.log(`[Scheduler] TRIGGERED! Running task '${taskIdentifier}'`);
        try {
            const targetEmail = process.env.MY_EMAIL_ADDRESS;
            let emailArgs = { to: targetEmail, subject: '', body: '', attachmentDescription: null };

            if (noteName) {
                const note = await noteService.getNote(noteName, lang);
                if (!note.success) throw new Error(`Scheduled task failed: Note '${noteName}' not found.`);
                
                emailArgs.subject = t('task_note_subject', lang, { noteName });
                emailArgs.body = t('task_note_body', lang, { noteContent: note.content });
            
            } else if (attachmentDescription) {
                emailArgs.subject = t('task_file_subject', lang, { attachmentDescription });
                emailArgs.body = t('task_file_body', lang, { attachmentDescription });
                emailArgs.attachmentDescription = attachmentDescription;
            
            } else if (subject && body) {
                emailArgs.subject = subject;
                emailArgs.body = body;

            } else {
                throw new Error(t('task_error_insufficient_info', lang));
            }

            await emailService.sendEmail(emailArgs, userAddress, signature, lang);
            console.log(`[Scheduler] Task '${taskIdentifier}' executed successfully.`);

        } catch (error) {
            console.error(`[Scheduler] ❌ Error executing scheduled task '${taskIdentifier}':`, error.message);
        } finally {
            task.stop();
            console.log(`[Scheduler] Task '${taskIdentifier}' finished and stopped.`);
        }
    }, { timezone: "Europe/Istanbul", scheduled: true });

    const successMessage = t('task_success_message', lang, { taskIdentifier, time });
    return { success: true, message: successMessage };
}

module.exports = { scheduleTask };