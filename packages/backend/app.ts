
import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import reminderRoutes from "./src/routes/remindersRoutes";


const app: Application = express();
console.log('i am here in app');
app.use(cors());
app.use(express.json());
app.use('/api', exampleRouts);
app.use("/api", reminderRoutes);


export default app;
