const { createUser } = require('../controller/user');

/** @module User */

module.exports = (app, nextMain) => {

  // app.post('/users', middleUser, controllerUser);
  app.post('/users', ()=>{
      console.log('línea 9 ruta user');
  });

    


  return nextMain();
};
