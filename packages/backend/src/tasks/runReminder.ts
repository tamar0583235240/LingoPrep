import reminderService from '../services/dailyReminderService';

(async () => {
  try {
    await reminderService.processReminders();
    console.log('🎉 הסתיים בהצלחה');
  } catch (error) {
    console.error('❌ שגיאה בתהליך:', error);
  }
})();
