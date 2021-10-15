require('dotenv').config();

exports.portBE = process.argv[2] || process.env.PORTBE
exports.portFE = process.env.PORTFE
exports.portDB = process.env.DATABASE_URL
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-chat-app';