import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import { setupSocket } from './events';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

const PORT = process.env.PORT || 3000;

// Setup Socket.IO events
setupSocket(io);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
