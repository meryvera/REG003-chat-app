/* console.log("Aló B");
console.log("Aló Mark"); */

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http'); // cambia por const CoinGecko = require('coingecko-api');
const server = http.createServer(app);

app.use(cors())

/* socket */
//const { Server } = require("socket.io");
//const io = new Server(server);
//----------

const io = require('socket.io')(server, {
  cors:{
    origin: ['*']
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

/* socket */
io.on('connection', (socket) => {
  console.log('a user connected');
  // the server gets it as a chat message event
   socket.on('chat message', (msg) => {
       console.log('message: ' + msg);
       io.emit('chat message', msg);
   });
});
//----------

server.listen(3000, () => {
  console.log('listening on *:3000');
});