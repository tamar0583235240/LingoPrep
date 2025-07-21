import request from 'supertest';
import app from '../../app';  
import { pool } from '../config/dbConnection';

jest.mock('../config/dbConnection', () => {
  const mClient = {
    query: jest.fn(),
  };
  return { pool: mClient };
});

describe('בדיקות ל־User Controller', () => {

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('GET /api/users מחזיר את כל המשתמשים', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [
        {
          id: '123',
          first_name: 'שירה',
          last_name: 'כהן',
          email: 'shira@example.com',
          phone: '0500000000',
          role: 'student',
          created_at: new Date().toISOString(),
          password: 'hashedpassword',
        },
      ],
    });

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('שירה');  
  });

  test('POST /api/users/add יוצר משתמש חדש', async () => {
    const mockUser = {
      id: 'uuid-123',
      first_name: 'דני',
      last_name: 'לוי',
      email: 'dani@example.com',
      phone: '0501234567',
      role: 'manager',
      created_at: new Date().toISOString(),
      password: 'hashedpassword',
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [mockUser],
    });

    const res = await request(app).post('/api/users/add').send({
      firstName: 'דני',
      lastName: 'לוי',
      email: 'dani@example.com',
      phone: '0501234567',
      role: 'manager',
      password: '123456', 
    });

    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe('דני');
  });

});
