

// ============================ Load internal module ================= //

const jwt = require("jsonwebtoken");
const exceptions = require("./customExceptions");
const { JWT_SECRET_KEY } = require("../config/config");
const redisClient = require("../utils/redis");
const messages = require("../messages");

// ============================= End ================================= //

// Generate token
const generateToken = async (user) => {
  try {
    const jwtToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET_KEY);
    user.token = jwtToken;
    await redisClient.setJWTToken(user);
    return jwtToken;
  } catch (err) {
    throw exceptions.internalServerError(messages.tokenGenException);
  }
};


// Export module
module.exports = {
  generateToken
};

