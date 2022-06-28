import express from 'express';
import cors from 'cors';
import http from 'http';

import path from 'path';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/*', (_req, res) => {
  // Send the client the JS even if they don't enter the site from "/"
  // See https://ui.dev/react-router-cannot-get-url-refresh
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

export const server = http.createServer(app);
