

const Promise = require("bluebird");
const dbConfig = require("../config/dbConfig");
const redisClient = dbConfig.client;
const redis = Promise.promisifyAll(redisClient);



const setValue = async function (key, value) {
  try {
    return await redisClient.setAsync(key, value);
  } catch (e) {
    throw e;
  }
};

const getValue = async function (key) {
  try {
    return await redisClient.getAsync(key);
  } catch (e) {
    throw e;
  }
};

const deleteKey = async function (key) {
  try {
    return await redisClient.delAsync(key);
  } catch (e) {
    throw e;
  }
};

const setJWTToken = function (user) {
  const key = user.id;
  const value = user.token;

  const saveUsrData = setValue(key, value);
  return saveUsrData;

};


module.exports = {
  setJWTToken,
  setValue,
  getValue,
  deleteKey,
};

