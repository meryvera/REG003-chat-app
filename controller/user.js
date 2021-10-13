const {PrismaClient}  = require('@prisma/client');
const prisma = new PrismaClient();

/* Creando User */
const createUser = async (req, resp, next) => {
    console.log('línea 13:');
    try {
        const user = await prisma.user.create({
            data: {
                email: 'vela.kathy@hotmail.com',
                name: 'Yess',
                password: 'Tigre123!'
            }
        })
        
        return reso.send(user)
    } catch (error) {
        console.log('línea15:', error);
      if (error) next(error);
    }
};

module.exports = {
    createUser
}