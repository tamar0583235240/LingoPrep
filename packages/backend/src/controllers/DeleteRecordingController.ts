import { Request, Response } from 'express';
import { upsertAutoDeleteConfig, getAutoDeleteConfig } from '../repository/deleteRecordingRepository';
import { deleteOldRecordings } from '../repository/deleteRecordingRepository';

export const getAutoDeleteConfigHandler = async (req: Request, res: Response) => {
    console.log("💡 reached GET /auto-delete-config");
  try {
    const config = await getAutoDeleteConfig();
    res.json(config);
  } catch (err) {
    console.error('Error getting config:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const postAutoDeleteConfigHandler = async (req: Request, res: Response) => {
  const { is_enabled, retention_days } = req.body;

  try {
    const updatedConfig = await upsertAutoDeleteConfig(is_enabled, retention_days);

    let deletedCount = 0;
    if (updatedConfig.is_enabled) {
      const dateBefore = new Date();
      dateBefore.setDate(dateBefore.getDate() - updatedConfig.retention_days);
      deletedCount = await deleteOldRecordings(dateBefore);
    }

    res.json({ ...updatedConfig, deletedCount });
  } catch (err) {
    console.error('Error saving config:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
