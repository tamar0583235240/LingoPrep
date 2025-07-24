import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 5000;
console.log("✅ JWT_SECRET loaded:", process.env.JWT_SECRET);
console.log('PORT from env😉😉😉:', process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

