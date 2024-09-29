import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import { setupSocket } from './events';
import  routerGames  from './routes/games/index';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

const PORT = process.env.PORT || 3000;

setupSocket(io);

app.use(cors());
app.use(express.json());
app.use('/api/games', routerGames);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
