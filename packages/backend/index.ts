
import dotenv from 'dotenv';
<<<<<<< HEAD
=======
import app from './app';

>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
dotenv.config();

import app from './src/app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
<<<<<<< HEAD
=======


>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
