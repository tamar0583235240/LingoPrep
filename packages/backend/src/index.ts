
import dotenv from 'dotenv';
dotenv.config();


console.log('SUPABASE_URL:', process.env.SUPABASE_URL,'index');
console.log("sdfghjuikolp0")
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SERVICE_ROLE_KEY,'index 2222222');

import app from './app';

const PORT = process.env.PORT || 5001;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

