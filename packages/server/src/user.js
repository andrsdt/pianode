const users = {};

const addUser = (timestamp, id, username, room) => {
  // key is the timestamp of the connection, value is the user object ({id, username, room})
  // Will replace the user with its new data if it already exists
  users[timestamp] = { id, username, room };
};

const removeUser = (id) => {
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

const getUserByTimestamp = (id) => users[id];

// Return an array of users that are in the room
const getUsersInRoom = (room) =>
  Object.values(users)
    .filter((user) => user.room === room)
    .map((user) => user.username);

module.exports = { addUser, removeUser, getUserByTimestamp, getUsersInRoom };
