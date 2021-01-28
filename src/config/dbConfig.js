
const config = require("./config");
const redis = require("redis");
const sequelize_module = require("sequelize");
//= ================================== Load Modules end =====================================

const client = redis.createClient(config.redisDb.port, config.redisDb.host);

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


let sequelize = new sequelize_module(
  config.db.name,
  config.db.user,
  config.db.password,
  {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  dialectOptions: config.db.dialectOptions,
  // timezone: config.db.timezone, //for writing to database
});


const initConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to mysql db");
  } catch (e) {
    console.log("Connection to mysql db failed");
    throw e;
  }
};
initConnection();
module.exports = {
  client,
  sequelize,
  initConnection,
};

