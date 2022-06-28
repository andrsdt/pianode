const { app } = require('./app');
const { addUser, getUsersInRoom } = require('./user');

app.get('/api/rooms', (_req, res) =>
  res.send('Hello World! from GET /api/rooms')
);

app.get('/api/rooms/:id', (req, res) => {
  const { id } = req.params;
  res.send(getUsersInRoom(id));
});

app.post('/api/rooms', (req, res) => {
  const { timestamp, id, username, room } = req.body;
  addUser(timestamp, id, username, room);
  res.status(201).send('Created');
});
