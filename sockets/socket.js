const disconnect = ( client, connectedUsers, io ) => {

  client.on("disconnect", function() {

    // connectedUsers.splice(connectedUsers.indexOf(client.decoded_token.id), 1);

    // console.log("disconnected socket", connectedUsers);

    const idUser = client.decoded_token.id;
    console.log('connectedUsers', connectedUsers)
    console.log('idUser', idUser)

    const array = connectedUsers.filter(function(e) {

      return e.userID !== idUser; 

    });

    connectedUsers = array;
    console.log('raíz modificada', connectedUsers);

    const usersConnectedId = connectedUsers.map(( e )=> e.username);
    console.log(usersConnectedId);

    io.emit("connectedUsers", usersConnectedId);

  });

  
  //connectedUsers.splice(connectedUsers.indexOf(client), 1);

}


// function updateUsernames() {
//   io.emit("get users", connectedUsers);
// };

module.exports = {
  disconnect
}
