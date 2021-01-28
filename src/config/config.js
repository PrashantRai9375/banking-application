const dotenv = require("dotenv");
dotenv.config();

module.exports = {
 node_env:process.env.NODE_ENV,
 app_port: process.env.PORT,
 db:{
    name  : process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    dialect:"mysql",
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    timezone: '+05:30' //for writing to database
 },
 redisDb: {
     redisIndex: process.env.REDIS_DB_INDEX,
     port: process.env.REDIS_DB_PORT,
     host: process.env.REDIS_DB_HOST
 },
 mailCreds: {
     email: process.env.EMAIL,
     password: process.env.PASSWORD
 },

 JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

};