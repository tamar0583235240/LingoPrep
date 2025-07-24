import { Request, Response } from 'express';
import { addParticipantRepo, deleteEmailFromSharedRecordingRepo, getAllPreviouslySharedEmails, getSharedWithByAnswerAndOwner } from '../repository/sharedRecordingRpository';
import { log } from 'console';

export const getSharedRecordingParticipants = async (req: Request, res: Response) => {
  const { answerId, ownerId } = req.params;

  try {
    const sharedWith = await getSharedWithByAnswerAndOwner(answerId, ownerId);
    res.status(200).json(sharedWith);
  } catch (error) {
    console.error("Error getting shared participants:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPreviouslySharedEmails = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const emails = await getAllPreviouslySharedEmails(userId);
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error getting shared emails:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteParticipant = async (req: Request, res: Response) => {
  console.log('deleteParticipant called');
  
  try {
    const { recordingId, email } = req.body;
    await deleteEmailFromSharedRecordingRepo(
      recordingId,
      email
    );
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting email from shared recording:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addParticipant = async (req: Request, res: Response): Promise<void> => {
  const { answerId, email, ownerId } = req.body;
  console.log('controller addParticipant called with:', { answerId, email, ownerId });
  try {
    const result = await addParticipantRepo(ownerId, answerId, email);
    if (result === 'already-exists') {
      res.status(409).json({ message: 'Participant already exists' });
    } else if (result === 'appended') {
      res.status(200).json({ message: 'Participant appended successfully' });
    } else if (result === 'created') {
      res.status(201).json({ message: 'Shared recording created successfully' });
    }
  } catch (error) {
    console.error('Error creating shared recording:', error);
    res.status(500).json({ error: 'Error creating shared recording' });
  }
};