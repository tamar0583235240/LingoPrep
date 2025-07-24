
import dotenv from 'dotenv';
import app from './app';
dotenv.config();


// const PORT = process.env.PORT || 5000;

// import app from './app';


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


