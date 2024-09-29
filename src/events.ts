import { Server as SocketIOServer } from 'socket.io';

export const setupSocket = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      io.emit('message', msg)
     });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
