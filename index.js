const express = require('express');
const cors = require('cors');
const config = require('./global/config');
const pkg = require('./package.json')
const routes = require('./routes');
const errorHandler = require('./middlewares/errors');
const app = express();
const http = require('http'); 
const server = http.createServer(app);
const { portBE, portFE } = config;
const socketioJwt = require('socketio-jwt');
const socket = require('./sockets/socket');

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(authMiddleware(secret)); -ERROR

const io = require('socket.io')(server, {
  cors:{
    //origin: [portFE],
    origin: true,
    credentials: true,
    methods: ["GET", "POST"] //son los metodos que usa internamente socke.io
  }
})

io.use(socketioJwt.authorize({
  secret: config.secret,
  handshake: true
}));
  
/* socket */
let connectedUsers=[];

io.on('connection', (client) => { //on escucha eventos connection, 1 vez que hay respuesta del cb (socket), manejo esas asincronioas
  console.log('Nuevo usuario conectado',  client.id);
      connectedUsers.push({
      userID: client.decoded_token.id ,
      username: client.decoded_token.name 
    })
  console.log('ES EL ARRAY', connectedUsers);

  io.emit("connectedUsers", connectedUsers);
  //++currentUsers
  // the server gets it as a chat message event
  client.on('sendMessage', (messageInfo) => {
    console.log('desde elk array',connectedUsers)
    console.log('message: ' + messageInfo.text); //message: Hola Kathy Angular - recibido desde el FE
    client.broadcast.emit('receiveMessage', messageInfo); // mandado del BE hacia el FE
  });

  socket.disconnect(client, connectedUsers);
});

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  server.listen(portBE, () => {
    console.log(`App listening on port ${portBE} =D`);
  });
});