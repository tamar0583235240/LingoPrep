import request from 'supertest';
import express from 'express';
import { addTip, adminTipController, updateTipController, deleteTipController } from '../controllers/tipsController';
import tipsRepository from '../reposioty/tipsRepository'; 

jest.mock('../reposioty/tipsRepository', () => ({
  addTip: jest.fn(),
  getAllTips: jest.fn(),
  updateTipById: jest.fn(),
  deleteTipById: jest.fn(),
}));

const app = express();
app.use(express.json());
app.post('/tips', addTip);
app.get('/tips', adminTipController);
app.put('/tips', updateTipController);
app.delete('/tips/:tip_id', deleteTipController);

describe('tipController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // נקה את המוק אחרי כל בדיקה
  });

  it('should add a tip', async () => {
    const mockTip = { content: 'Test tip content' };
    const mockResult = { id: '123', content: 'Test tip content', created_at: '2023-07-10T00:00:00.000Z' };

    // מוקה של הפונקציה addTip
    (tipsRepository.addTip as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).post('/tips').send(mockTip);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResult);
  });

  it('should fetch all tips (admin)', async () => {
    const mockTips = [
      { id: '1', content: 'Test tip 1', created_at: '2023-07-10T00:00:00.000Z' },
      { id: '2', content: 'Test tip 2', created_at: '2023-07-11T00:00:00.000Z' },
    ];

    // מוקה של הפונקציה getAllTips
    (tipsRepository.getAllTips as jest.Mock).mockResolvedValue(mockTips);

    const response = await request(app).get('/tips');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTips);
  });

  it('should update a tip', async () => {
    const mockUpdate = { id: '1', content: 'Updated tip content' };
    const mockUpdatedTip = { id: '1', content: 'Updated tip content', created_at: '2023-07-10T00:00:00.000Z' };

    // מוקה של הפונקציה updateTipById
    (tipsRepository.updateTipById as jest.Mock).mockResolvedValue(mockUpdatedTip);

    const response = await request(app).put('/tips').send(mockUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedTip);
  });

  it('should delete a tip', async () => {
    const tipId = '1';
    const mockResponseMessage = 'Tip deleted successfully';

    // מוקה של הפונקציה deleteTipById
    (tipsRepository.deleteTipById as jest.Mock).mockResolvedValue(mockResponseMessage);

    const response = await request(app).delete(`/tips/${tipId}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe(mockResponseMessage);
  });

  it('should handle error while adding a tip', async () => {
    const mockTip = { content: 'Test tip content' };

    // מוקה של שגיאה ב־addTip
    (tipsRepository.addTip as jest.Mock).mockRejectedValue(new Error('ADD_TIP_FAILED'));

    const response = await request(app).post('/tips').send(mockTip);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
  });

  it('should handle error while fetching all tips', async () => {
    // מוקה של שגיאה ב־getAllTips
    (tipsRepository.getAllTips as jest.Mock).mockRejectedValue(new Error('GET_ALL_TIPS_FAILED'));

    const response = await request(app).get('/tips');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('GET_ALL_TIPS_FAILED');
  });

  it('should handle error while updating a tip', async () => {
    const mockUpdate = { id: '1', content: 'Updated tip content' };

    // מוקה של שגיאה ב־updateTipById
    (tipsRepository.updateTipById as jest.Mock).mockRejectedValue(new Error('UPDATE_TIP_FAILED'));

    const response = await request(app).put('/tips').send(mockUpdate);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Failed to update tip');
  });

  it('should handle error while deleting a tip', async () => {
    const tipId = '1';

    // מוקה של שגיאה ב־deleteTipById
    (tipsRepository.deleteTipById as jest.Mock).mockRejectedValue(new Error('DELETE_TIP_FAILED'));

    const response = await request(app).delete(`/tips/${tipId}`);
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('DELETE_TIP_FAILED');
  });
});
