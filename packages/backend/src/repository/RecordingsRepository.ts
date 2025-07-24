import axios from 'axios'
import dotenv from 'dotenv';

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

export const getAllRecordingsFromCloudinary = async () => {
  try {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/video`;

    const response = await axios.get(url, {
      auth: {
        username: API_KEY!,
        password: API_SECRET!,
      },
    });

    return {
      status: response.status,
      data: response.data.resources,
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message || // לפעמים זה ככה
      error.message ||
      'Unknown error';

    console.error('Cloudinary Error:', message);

    return {
      status: error.response?.status || 500,
      error: true,
      message,
    };
  }
};
