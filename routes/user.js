const { createUser } = require('../controller/user');
const express = require('express');
const app = express();


/** @module User */

module.exports = (app, nextMain) => {

  // app.post('/users', middleUser, controllerUser);
  app.post('/users', createUser );

    


  return nextMain();
};
