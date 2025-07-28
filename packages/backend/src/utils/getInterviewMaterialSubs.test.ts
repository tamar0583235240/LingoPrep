import request from 'supertest';
import app from '../../app'; 
import { pool } from '../config/dbConnection';
import test, { afterEach, describe } from 'node:test';

jest.mock('../config/dbConnection', () => {
  const mClient = {
    query: jest.fn(),
  };
  return { pool: mClient };
});

describe('בדיקות ל־InterviewMaterialSub Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/interview_materials_hub מחזיר 200 עם נתונים תקינים', async () => {
    const mockData = [
      {
        id: 1,
        title: 'מבני נתונים',
        short_description: '  תרגול על BFS ',
        created_at: new Date().toISOString()
      },
    ];

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockData });

    const res = await request(app).get('/api/interview_materials_hub');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('מבני נתונים');
  });

  test('GET /api/interview_materials_hub מחזיר 500 אם יש שגיאה', async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app).get('/api/interview_materials_hub');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/interview_materials_hub מחזיר 400 אם הבקשה לא חוקית (מדומה)', async () => {
    // לדוגמה – אם את מוסיפה קוד שדורש query param מסוים
    const res = await request(app).get('/api/interview_materials_hub?badParam=1');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Bad request');
  });

  test('GET /api/interview_materials_hubמחזיר 300 (מדומה)', async () => {
    const res = await request(app)
      .get('/api/interview_materials_hub')
      .set('x-test-redirect', 'true');

    expect(res.status).toBe(300);
    expect(res.body).toHaveProperty('info', 'Multiple choices');
  });

});
function expect(status: any) {
  throw new Error('Function not implemented.');
}

