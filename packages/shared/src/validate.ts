export const validate = {
  username: (username: string) => {
    const isValid = /^\w+$/.test(username);
    const toast = {
      type: "error",
      id: "username-invalid",
      message: "Must be alphanumeric",
    };
    return isValid ? { isValid, toast: null } : { isValid, toast };
  },

  room: (room: string) => {
    const isValid = /^\d{4}$/.test(room);
    const toast = {
      type: "error",
      id: "room-invalid",
      message: "Must be 4 digits long",
    };
    return isValid ? { isValid, toast: null } : { isValid, toast };
  },
};
