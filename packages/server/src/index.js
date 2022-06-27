const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, '../../client/dist')));

const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    // TODO: here and everywhere, check if the message was sent by me
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('key_down', (e) => {
    console.log('key pressed: ', e.key);
    socket.broadcast.emit('key_down', e);
  });

  socket.on('key_up', (e) => {
    console.log('key released: ', e.key);
    socket.broadcast.emit('key_up', e);
  });

  socket.on('pedal_down', (e) => {
    console.log('pedal pressed');
    socket.broadcast.emit('pedal_down', e);
  });

  socket.on('pedal_up', (e) => {
    console.log('pedal released');
    socket.broadcast.emit('pedal_up', e);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(3001, () => {
  console.log('SERVER RUNNING');
});
