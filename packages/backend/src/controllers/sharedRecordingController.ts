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
import * as sharedRepo from '../repository/sharedRecordings.repository';

export const getSharedRecordingsByUser = async (req: Request, res: Response) => {
  try {
      const { userId, role } = req.params;
    console.log("getSharedRecordingsByUser called with:", { userId, role });
    if (!userId || !role) {
      return res.status(400).json({ error: 'Missing userId or role in query' });
    }
    const recordings = await sharedRepo.getSharedRecordingsByUserId(userId, role);
    res.status(200).json(recordings);
  } catch (error) {
    console.error('Error in getSharedRecordingsByUser:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getRecordingDetails = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { sharedRecordingId, comment, rating, givenByUserId } = req.body;


    const existing = await sharedRepo.getFeedbackByRecordingAndUser(sharedRecordingId, givenByUserId);

    let feedback;
    if (existing) {
      feedback = await sharedRepo.updateFeedback(existing.id, comment, rating);
    } else {
      feedback = await sharedRepo.insertFeedback(sharedRecordingId, comment, rating, givenByUserId);
    }

    res.status(201).json(feedback);
  } catch (error: any) {
    console.error('Error creating feedback:', error, error?.message);
    res.status(500).json({
      message: 'Internal server error while creating feedback',
      details: error.message,
      stack: error.stack,
      error: error
    });
  }
};


export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const feedbackId = req.params.id;
    const { comment, rating } = req.body;
    const updated = await sharedRepo.updateFeedback(feedbackId, comment, rating);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error });
  }
};
