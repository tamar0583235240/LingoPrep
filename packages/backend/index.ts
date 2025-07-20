
import dotenv from 'dotenv';
dotenv.config();

// Allow self-signed certificates in development (not for production!)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// console.log('SUPABASE_URL:', process.env.SUPABASE_URL,'index');
// console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY);

import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


