const validators = {
  room: (socket, room) => {
    const isValid = room.match(/^\d{5}$/);
    if (!isValid) {
      socket.emit('notification', {
        type: 'error',
        id: 'room-invalid',
        message: 'Invalid room code. Must be of the type "12345"',
      });
    }
    return isValid;
  },

  username: (socket, username) => {
    const isValid = username.match(/^\w+$/);
    if (!isValid) {
      socket.emit('notification', {
        type: 'error',
        id: 'username-invalid',
        message: 'Invalid username. Must only contain letters or numbers',
      });
    }
    return isValid;
  },
};
module.exports = validators;
