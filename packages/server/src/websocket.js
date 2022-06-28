const { Server } = require('socket.io');
const { server } = require('./app');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { getUsersInRoom, removeUser } = require('./user');

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', async ({ room }) => {
    await socket.join(room);
    // Send the users in the room the new list
    console.log(`notifying users in ${room}`);
    io.to(room).emit('users', getUsersInRoom(room));
  });

  socket.on('key_down', (e) => {
    socket.to(e.room).emit('key_down', e);
  });

  socket.on('key_up', (e) => {
    socket.to(e.room).emit('key_up', e);
  });

  socket.on('pedal_down', (e) => {
    socket.to(e.room).emit('pedal_down', e);
  });

  socket.on('pedal_up', (e) => {
    socket.to(e.room).emit('pedal_up', e);
  });

  socket.on('disconnect', () => {
    const { id } = socket;
    const { room } = removeUser(id);
    // Send the users in the room the new list
    io.to(room).emit('users', getUsersInRoom(room));
    console.log('User Disconnected', socket.id);
  });
});
