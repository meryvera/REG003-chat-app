const { signIn } = require("../controller/auth")
const jwt = require('jsonwebtoken');


const signInVerify = async (req, resp, next) => {
    console.log('linea 6')

    const { authorization } = req.headers;
    console.log('linea 9')
    if (!authorization) {
        console.log('linea 11')

      return next();
    }
    console.log('linea 15')

    const [type, token] = authorization.split(' ');
    console.log('linea 18')

    if (type.toLowerCase() !== 'bearer') {

      return next();
    }
      console.log('linea 24')

    jwt.verify(token, secret, async (err, decodedToken) => {
        console.log('linea 27')

        if (err) {
        return next(403);
        }
        
        // TO DO: Verificar identidad del usuario usando `decodeToken.uid`
        const { uid } = decodedToken;
        console.log(uid)

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
  