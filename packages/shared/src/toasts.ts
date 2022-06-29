// Centralizes the logic for generating homogenous toasts
// This is in the "shared" module because they can be requested
// by both the server (to send the user notifications in the)
// toast format) and the client (to display its own notifications)
export const toasts = {
  info: {
    joinRoom: (username: string) => ({
      id: `user-join-${username}`,
      message: `${username} has joined the room`,
      type: "info",
    }),

    leaveRoom: (username: string) => ({
      id: `user-leave-${username}`,
      message: `${username} has left the room`,
      type: "info",
    }),
  },
};
