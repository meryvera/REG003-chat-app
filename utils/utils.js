const jwt = require("jsonwebtoken");
const generateJWT = (email, id) => {
    const token = jwt.sign(
        { id: id, email: email },
        config.secret,
        {
          expiresIn: 60 * 60 * 6,
        }
      );
    return token
    
};



module.exports ={
    generateJWT
}
