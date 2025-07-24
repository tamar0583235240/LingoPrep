import request from 'supertest';
import app from '../../app';
import { pool } from '../config/dbConnection';

jest.mock('../config/dbConnection', () => ({
  pool: {
    query: jest.fn(),
    end: jest.fn(),
  },
}));

const validUserId = "00000000-0000-0000-0000-000000000000";

describe('בדיקות ל־Progress Controller', () => {
  beforeEach(() => {
    (pool.query as jest.Mock).mockImplementation((text, params) => {
      if (text.includes('SELECT 1 FROM users WHERE id')) {
        return Promise.resolve({ rowCount: 1 });
      }
      if (text.includes('SELECT COUNT(*) FROM questions')) {
        return Promise.resolve({ rows: [{ count: '100' }] });
      }
      if (text.includes('SELECT COUNT(*) FROM answers')) {
        return Promise.resolve({ rows: [{ count: '45' }] });
      }
      return Promise.reject(new Error('לא נמצא תוצאה מתאימה'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('מחזיר סטטיסטיקות תקינות עבור משתמש קיים', async () => {
    const res = await request(app).get(`/api/questions/progress/${validUserId}`);

    console.log('✅ בדיקה: getProgressStats - משתמש קיים');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalQuestions: 100,
      answeredQuestions: 45,
      progressPercent: 45,
    });
  });

  test('מחזיר 404 אם המשתמש לא קיים', async () => {
    (pool.query as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ rowCount: 0 })
    );

    const res = await request(app).get(`/api/questions/progress/${validUserId}`);

    console.log('✅ בדיקה: getProgressStats - משתמש לא קיים');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('משתמש לא נמצא');
  });

  test('מחזיר 400 אם מזהה משתמש לא תקין', async () => {
    const res = await request(app).get(`/api/questions/progress/invalid-uuid`);

    console.log('✅ בדיקה: getProgressStats - מזהה לא תקין');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/מזהה משתמש לא תקין/);
  });
});
