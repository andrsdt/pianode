const { Server } = require('socket.io');
const { server } = require('./app');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { getUsersInRoom, removeUser, addUser } = require('./user');
const validators = require('./validators');

io.on('connection', (socket) => {
  socket.on('join_room', async (e, callback) => {
    const { timestamp, id, username, room } = e;

    if (
      !validators.room(socket, room) ||
      !validators.username(socket, username)
    ) {
      callback({ status: 'error' });
      return;
    }

    await socket.join(room);
    addUser(timestamp, id, username, room);
    io.to(room).emit('users', getUsersInRoom(room));
    callback({ status: 'ok' });
  });

  socket.on('leave_room', async (e, callback) => {
    const { room } = e;

    if (!validators.room(socket, room)) {
      callback({ status: 'error' });
      return;
    }

    await socket.leave(room);
    const { id } = socket;
    removeUser(id);
    io.to(room).emit('users', getUsersInRoom(room));
    callback({ status: 'ok' });
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
  });
});
