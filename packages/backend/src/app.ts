import express, { Application } from 'express';
import cors from 'cors';
import answerRoutes from './routes/answerRouts' 



const app: Application = express();
app.use(cors());
app.use(express.json());
app.use('/api/answers', answerRoutes);


app.get('/test', (req, res) => res.send('Test route works'));


export default app;

