import { server } from './app.js';
import './websocket.js'; // Run the websocket code

// Heroku dynamically assigns your app a port, so we can't set the port to a fixed number
// We can use the process.env.PORT variable to get the port number set by heroku
server.listen(process.env.PORT || 3001);
