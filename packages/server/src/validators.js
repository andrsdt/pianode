import { validate } from 'shared';

export const validators = {
  room: (socket, room) => {
    const { isValid, toast } = validate.room(room);
    if (!isValid) socket.emit('notification', toast);
    return isValid;
  },

  username: (socket, username) => {
    const { isValid, toast } = validate.username(username);
    if (!isValid) socket.emit('notification', toast);
    return isValid;
  },
};
