const express = require('express');
const cors = require('cors');
const config = require('../global/config');

const app = express();

const http = require('http'); 
const server = http.createServer(app);

const { portBE, portFE } = config;

app.use(cors())

const io = require('socket.io')(server, {
  cors:{
    origin: [portFE],
    credentials: true,
    methods: ["GET", "POST"]
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

/* socket */
io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');
  // the server gets it as a chat message event
   socket.on('chat message', (objet) => {
      console.log('message: ' + objet.msg);
      io.emit('chat message', objet);
      // socket.emit ("testing Kathy")
   });
});

server.listen(portBE, () => {
  console.log(`App listening on port ${portBE} =D`);
});