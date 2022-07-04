const users = {};

export const addUser = (timestamp, user) => {
  // key is the timestamp of the connection, value is the user object ({id, username, room})
  // Will replace the user with its new data if it already exists
  const { id, room, username, colorHue } = user;
  users[timestamp] = { id, room, username, colorHue };
};

export const removeUser = (id) => {
  // Find in the object the key that matches the id
  const key = Object.keys(users).find((k) => users[k].id === id);

  // Make a copy of the object before deleting it
  const copy = { ...users[key] };

  // Delete the user from the object
  delete users[key];

  // When the user disconnects, his list of rooms will be empty.
  // This is why we return the user before removing him from our records
  return copy;
};

export const updateColor = (id, hue) => {
  // Find in the object the key that matches the id
  const key = Object.keys(users).find((k) => users[k].id === id);
  if (!key) return null;

  // Update the user's colorHue
  users[key].colorHue = hue;

  // When the user changes his color, all the other users in the same room will see it
  return users[key];
};

export const getUserByTimestamp = (id) => users[id];

// Return an array of users that are in the room
export const getUsersInRoom = (room) =>
  // TODO: it would be better if we didn't send back the id of the user, which is something internal
  // When the user store is implemented, we can get rid of that
  Object.values(users).filter((user) => user.room === room);
