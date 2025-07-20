import dotenv from 'dotenv';
import { createApp } from './app';

dotenv.config();

const startServers = async () => {
  
  const PORTA = process.env.PORTA || 5000;
  const PORTB = process.env.PORTB || 5001; 
  
  const appA = await createApp(5002);
  appA.listen(PORTA, () => {
    console.log(`Server A is running on port ${PORTA}`);
  });

  const appB = await createApp(5003);
  appB.listen(PORTB, () => {
    console.log(`Server B is running on port ${PORTB}`);
  });
};

startServers().catch(error => {
  console.error('Error starting the servers:', error);
});


