const path = require('path');
const { app } = require('./app');
const { addUser, getUsersInRoom } = require('./user');

app.get('/*', (req, res) => {
  // Send the client the JS even if they don't enter the site from "/"
  // See https://ui.dev/react-router-cannot-get-url-refresh
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

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
