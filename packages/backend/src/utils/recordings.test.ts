import axios from 'axios';
import { getAllRecordingsFromCloudinary } from '../repository/RecordingsRepository';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getAllRecordingsFromCloudinary', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data when status is 200', async () => {
    const mockData = { resources: ['video1', 'video2'] };
    mockedAxios.get.mockResolvedValue({ status: 200, data: mockData });

    const result = await getAllRecordingsFromCloudinary();

    expect(result.status).toBe(200);
    expect(result.data).toEqual(mockData.resources);
    expect(result.error).toBeUndefined();
  });

  it('should handle 400 status', async () => {
    const errorResponse = {
      response: { status: 400, data: { message: 'Bad request' } },
    };
    mockedAxios.get.mockRejectedValue(errorResponse);

    const result = await getAllRecordingsFromCloudinary();

    expect(result.status).toBe(400);
    expect(result.error).toBe(true);
    expect(result.message).toBe('Bad request');
  });

  it('should handle 401 status', async () => {
    const errorResponse = {
      response: { status: 401, data: { message: 'Unauthorized' } },
    };
    mockedAxios.get.mockRejectedValue(errorResponse);

    const result = await getAllRecordingsFromCloudinary();

    expect(result.status).toBe(401);
    expect(result.error).toBe(true);
    expect(result.message).toBe('Unauthorized');
  });

  it('should handle 500 status', async () => {
    const errorResponse = {
      response: { status: 500, data: { message: 'Server error' } },
    };
    mockedAxios.get.mockRejectedValue(errorResponse);

    const result = await getAllRecordingsFromCloudinary();

    expect(result.status).toBe(500);
    expect(result.error).toBe(true);
    expect(result.message).toBe('Server error');
  });

  it('should handle unexpected status codes (e.g., 300)', async () => {
    const errorResponse = {
      response: { status: 300, data: { message: 'Redirect' } },
    };
    mockedAxios.get.mockRejectedValue(errorResponse);

    const result = await getAllRecordingsFromCloudinary();

    expect(result.status).toBe(300);
    expect(result.error).toBe(true);
    expect(result.message).toBe('Redirect');
  });

  it('should handle no response error (network or unknown)', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    const result = await getAllRecordingsFromCloudinary();

    expect(result.status).toBe(500);
    expect(result.error).toBe(true);
    expect(result.message).toBe('Network error');
  });
});
