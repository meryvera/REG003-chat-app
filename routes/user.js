const { createUser } = require('../controller/user');
const { middlewareCreateUser } = require('../middlewares/middleUser')
const { body } = require('express-validator');

/** @module User **/
const nameValidate = body('name').isLength({ min: 2 });    
// username must be an email
const emailValidate = body('email').isEmail();
// password must be at least 8 chars long
const passwordValidate = body('password').isLength({ min: 8 });

module.exports = (app, nextMain) => {

  app.post('/users', 
    nameValidate, 
    emailValidate, 
    passwordValidate, 
    middlewareCreateUser, 
    createUser 
  );

  return nextMain();
};
