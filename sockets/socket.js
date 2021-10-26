const socketIO = require('socket.io');

const disconnect = ( client, connectedUsers ) => {

    
  client.on("disconnect", function() {
    connectedUsers.splice(connectedUsers.indexOf(client.userID), 1);
    // updateUsernames();
    // connections.splice(connections.indexOf(client), 1);
    console.log("disconnected socket", connectedUsers)
    //io.emit("connectedUsers", connectedUsers);

});

  
  //connectedUsers.splice(connectedUsers.indexOf(client), 1);

}


// function updateUsernames() {
//   io.emit("get users", connectedUsers);
// };

module.exports = {
  disconnect
}
