const jwt = require('jsonwebtoken');
const config = require('../global/config');
const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();

const signInVerify = async (req, resp, next) => {

    const { authorization } = req.headers;
    if (!authorization) {
      return next();
    }

    const [type, token] = authorization.split(' ');

    if (type.toLowerCase() !== 'bearer') {

      return next();
    }

    jwt.verify(token, config.secret, async (err, decodedToken) => {

        if (err) return next(403);
        // TO DO: Verificar identidad del usuario usando `decodeToken.uid`
        const { id } = decodedToken;

        const emailUser = await prisma.user.findUnique({
            where: {
                id
            },
        })

        if (!emailUser) return next(404);
        //console.log('authMiddleware línea 26', getUserByUid);
        req.authToken = emailUser;
        return next();
    });
  };    

module.exports = {
    signInVerify
}
  