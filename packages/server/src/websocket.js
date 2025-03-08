import { Server } from 'socket.io';
import { toasts } from 'shared';
import { server } from './app.js';
import { validators } from './validators.js';
import { getUsersInRoom, removeUser, addUser, updateColor } from './user.js';

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('join_room', async (e, callback) => {
    const { timestamp, user } = e;
    user.id = socket.id;

    if (
      !validators.room(socket, user.room) ||
      !validators.username(socket, user.username)
    ) {
      callback({ status: 'error' });
      return;
    }

    await socket.join(user.room);
    addUser(timestamp, user);
    io.to(user.room).emit('users', getUsersInRoom(user.room));
    io.to(user.room)
      .except(user.id)
      .emit('notification', toasts.info.joinRoom(user));
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
    const user = removeUser(id);

    // if the user is not in the room, return an error
    if (!user.username || user.room !== room) {
      callback({ status: 'error' });
      return;
    }

    io.to(room).emit('users', getUsersInRoom(room));
    io.to(room).except(id).emit('notification', toasts.info.leaveRoom(user));
    callback({ status: 'ok' });
  });

  socket.on('change_color', (e) => {
    const { hue } = e;
    const { id } = socket;
    const user = updateColor(id, hue);
    if (!user) return;
    io.to(user.room).emit('users', getUsersInRoom(user.room));
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
    const { user, room } = removeUser(id);
    if (!user) return;
    // Send the users in the room the new list
    io.to(room).emit('users', getUsersInRoom(room));
    io.to(room)
      .except(socket.id)
      .emit('notification', toasts.info.leaveRoom(user));
  });
});
