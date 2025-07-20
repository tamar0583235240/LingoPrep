import request from 'supertest';
import express from 'express';
import { addPractice, deletePracticeController, updatePracticeController, adminPracticeController } from '../controllers/practicesController';
import practiceRepository from '../reposioty/practiceRepository';

jest.mock('../reposioty/practiceRepository', () => ({
  addPractice: jest.fn(),
  getAllPractices: jest.fn(),
  updatePracticeById: jest.fn(),
  deletePracticeById: jest.fn(),
}));

const app = express();
app.use(express.json());
app.post('/practices', addPractice);
app.get('/practices', adminPracticeController);
app.put('/practices', updatePracticeController);
app.delete('/practices/:practice_id', deletePracticeController);

describe('practiceController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // נקה את המוק אחרי כל בדיקה
  });

  it('should add a practice', async () => {
    const mockPractice = { content: 'Test practice content' };
    const mockResult = { id: '123', content: 'Test practice content', created_at: '2023-07-10T00:00:00.000Z' };

    // מוקה של הפונקציה addPractice
    (practiceRepository.addPractice as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).post('/practices').send(mockPractice);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResult);
  });

  it('should fetch all practices (admin)', async () => {
    const mockPractices = [
      { id: '1', content: 'Test practice 1', created_at: '2023-07-10T00:00:00.000Z' },
      { id: '2', content: 'Test practice 2', created_at: '2023-07-11T00:00:00.000Z' },
    ];

    // מוקה של הפונקציה getAllPractices
    (practiceRepository.getAllPractices as jest.Mock).mockResolvedValue(mockPractices);

    const response = await request(app).get('/practices');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPractices);
  });

  it('should update a practice', async () => {
    const mockUpdate = { id: '1', content: 'Updated practice content' };
    const mockUpdatedPractice = { id: '1', content: 'Updated practice content', created_at: '2023-07-10T00:00:00.000Z' };

    // מוקה של הפונקציה updatePracticeById
    (practiceRepository.updatePracticeById as jest.Mock).mockResolvedValue(mockUpdatedPractice);

    const response = await request(app).put('/practices').send(mockUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedPractice);
  });

  it('should delete a practice', async () => {
    const practiceId = '1';
    const mockResponseMessage = 'Practice deleted successfully';
    (practiceRepository.deletePracticeById as jest.Mock).mockResolvedValue(mockResponseMessage);
    const response = await request(app).delete(`/practices/${practiceId}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe(mockResponseMessage);
  });

  it('should handle error while adding a practice', async () => {
    const mockPractice = { content: 'Test practice content' };

    // מוקה של שגיאה ב־addPractice
    (practiceRepository.addPractice as jest.Mock).mockRejectedValue(new Error('ADD_PRACTICE_FAILED'));

    const response = await request(app).post('/practices').send(mockPractice);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
  });

  it('should handle error while fetching all practices', async () => {
    // מוקה של שגיאה ב־getAllPractices
    (practiceRepository.getAllPractices as jest.Mock).mockRejectedValue(new Error('GET_ALL_PRACTICES_FAILED'));

    const response = await request(app).get('/practices');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('GET_ALL_PRACTICES_FAILED');
  });

  it('should handle error while updating a practice', async () => {
    const mockUpdate = { id: '1', content: 'Updated practice content' };

    // מוקה של שגיאה ב־updatePracticeById
    (practiceRepository.updatePracticeById as jest.Mock).mockRejectedValue(new Error('UPDATE_PRACTICE_FAILED'));

    const response = await request(app).put('/practices').send(mockUpdate);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Failed to update practice');
  });

  it('should handle error while deleting a practice', async () => {
    const practiceId = '1';

    // מוקה של שגיאה ב־deletePracticeById
    (practiceRepository.deletePracticeById as jest.Mock).mockRejectedValue(new Error('DELETE_PRACTICE_FAILED'));

    const response = await request(app).delete(`/practices/${practiceId}`);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('DELETE_PRACTICE_FAILED');
  });
});
