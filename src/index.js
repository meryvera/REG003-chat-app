const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http'); 
const server = http.createServer(app);

app.use(cors())

const io = require('socket.io')(server, {
  cors:{
    origin: ['http://localhost:4200'],
    credentials: true,
    methods: ["GET", "POST"]
  }
  // cors:{
  //    origin:true,
  //    credentials: true,
  //    methods: ["GET", "POST"]
  //}
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

server.listen(3000, () => {
  console.log('listening on *:3000');
});