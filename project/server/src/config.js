const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 4000,
  dbConfig: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'savr',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-12345',
};


