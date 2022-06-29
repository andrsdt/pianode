import { Server } from 'socket.io';
import { toasts } from 'shared';
import { server } from './app';
import { validators } from './validators';
import { getUsersInRoom, removeUser, addUser } from './user';

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('join_room', async (e, callback) => {
    const { timestamp, username, room } = e;

    if (
      !validators.room(socket, room) ||
      !validators.username(socket, username)
    ) {
      callback({ status: 'error' });
      return;
    }

    await socket.join(room);
    addUser(timestamp, socket.id, username, room);
    io.to(room).emit('users', getUsersInRoom(room));
    io.to(room)
      .except(socket.id)
      .emit('notification', toasts.info.joinRoom(username));
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
    io.to(room)
      .except(socket.id)
      .emit('notification', toasts.info.leaveRoom(user.username));
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
    const { username, room } = removeUser(id);
    // Send the users in the room the new list
    io.to(room).emit('users', getUsersInRoom(room));
    io.to(room)
      .except(socket.id)
      .emit('notification', toasts.info.leaveRoom(username));
  });
});
