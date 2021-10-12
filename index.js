const express = require('express');
const cors = require('cors');
const config = require('./global/config');
const pkg = require('./package.json')

const app = express();

const http = require('http'); 
const server = http.createServer(app);

const { portBE, portFE } = config;

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(authMiddleware(secret)); -ERROR

const io = require('socket.io')(server, {
  cors:{
    origin: [portFE],
    credentials: true,
    methods: ["GET", "POST"] //son los metodos que usa internamente socke.io
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

/* socket */
io.on('connection', (client) => { //on escucha eventos connection, 1 vez que hay respuesta del cb (socket), manejo esas asincronioas
  console.log('Nuevo usuario conectado' /* + client */);//[object Object]
  // the server gets it as a chat message event
  client.on('sendMessage', (messageInfo) => {
    console.log('message: ' + messageInfo.text); //message: Hola Kathy Angular - recibido desde el FE
    client.broadcast.emit('receiveMessage', messageInfo); // mandado del BE hacia el FE
    // socket.emit ("testing Kathy")
  });

  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  })
});

server.listen(portBE, () => {
  console.log(`App listening on port ${portBE} =D`);
});