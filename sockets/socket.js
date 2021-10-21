const socketIO = require('socket.io');

const disconnect = ( client ) => {
    
  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  })
}

module.exports = {
  disconnect
}
