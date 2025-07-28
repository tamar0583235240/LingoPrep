import cron from 'node-cron';

import { getAutoDeleteConfig, deleteOldRecordings } from '../repository/deleteRecordingRepository';

cron.schedule('0 2 * * *', async () => {
  try {
    const config = await getAutoDeleteConfig();
    if (config?.is_enabled && config?.retention_days) {
      const now = new Date();
      now.setDate(now.getDate() - config.retention_days);
      const deleted = await deleteOldRecordings(now);
      console.log(`[AUTO DELETE] מחקו ${deleted} הקלטות ישנות`);
    }
  } catch (error) {
    console.error('[AUTO DELETE ERROR]', error);
  }
});



