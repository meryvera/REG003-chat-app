// const { isValidEmail } = require('../utils/utils');
const { validationResult } = require('express-validator');

const middlewareCreateUser = async (req, resp, next) => {

    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('21');
        return resp.status(400).json({ errors: errors.array() });
        }
        return next()

    } catch (error) {
        console.log('25 middle:', error);
        return next(error)
    }

};
  
  module.exports = {
      middlewareCreateUser
  }