const { signIn } = require('../controller/auth');

/** @module auth */
module.exports = (app, nextMain) => {

  app.post('/auth', signIn);

  return nextMain();
};
