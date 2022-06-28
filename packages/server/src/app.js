const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/*', (_req, res) => {
  // Send the client the JS even if they don't enter the site from "/"
  // See https://ui.dev/react-router-cannot-get-url-refresh
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const server = http.createServer(app);

module.exports = { app, server };
