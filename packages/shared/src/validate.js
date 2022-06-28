export const validate = {
  username: (username) => {
    const isValid = /^\w+$/.test(username);
    const toast = {
      type: 'error',
      id: 'username-invalid',
      message: 'Invalid username. Must only contain letters or numbers',
    };
    return { isValid, toast: isValid ? null : toast };
  },

  room: (room) => {
    const isValid = /^\d{5}$/.test(room);
    const toast = {
      type: 'error',
      id: 'room-invalid',
      message: 'Invalid room code. Must be of the type "12345"',
    };
    return { isValid, toast: isValid ? null : toast };
  },
};
