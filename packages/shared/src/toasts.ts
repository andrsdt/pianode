// Centralizes the logic for generating homogenous toasts
// This is in the "shared" module because they can be requested
// by both the server (to send the user notifications in the)

import { IUser } from "./user";

// toast format) and the client (to display its own notifications)
export const toasts = {
  info: {
    joinRoom: (user: IUser) => ({
      id: `user-join-${user.username}`,
      message: `${user.username} has joined the room`,
      type: "info",
    }),

    leaveRoom: (user: IUser) => ({
      id: `user-leave-${user.username}`,
      message: `${user.username} has left the room`,
      type: "info",
    }),
  },
};
