export const validate = {
  username: (username: string) => {
    const isValid = /^\w+$/.test(username);
    const toast = {
      type: "error",
      id: "username-invalid",
      message: "Invalid username. Must only contain letters or numbers",
    };
    return isValid ? { isValid, toast: null } : { isValid, toast };
  },

  room: (room: string) => {
    const isValid = /^\d{5}$/.test(room);
    const toast = {
      type: "error",
      id: "room-invalid",
      message: 'Invalid room code. Must be of the type "12345"',
    };
    return isValid ? { isValid, toast: null } : { isValid, toast };
  },
};
