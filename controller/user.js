const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

/* Creando User */
const createUser = async (req, resp, next) => {
    const { name, email, password } = req.body;
    
    try {
        // const salt = bcrypt.genSaltSync();
        // user.password = bcrypt.hashSync(password, salt);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        
        return resp.json( newUser )

    } catch (error) {
        console.log('línea15:', error);
      if (error) next(error);
    }
};

module.exports = {
    createUser
}