const userController = {};
const userDao = require("../dao/userDao");
const exceptions = require("../core/customExceptions");
const jwtHandler = require("../core/jwtHandler");
const messages = require("../messages");
const {STATUS,ROLES } = require("../constants");
const { appUtils,redis } = require("../utils");


userController.createUser = async (params) => {
    try {
        appUtils.validator({
            container: params,
            fields: [
              { key: 'name', trimmed: true, type: 'string'},
              { key: 'email', trimmed: true, type: 'email'},
              { key: 'password', trimmed: true, type: 'string'},
              { key: 'role', required: true, type: 'between',range:[ROLES.CUSTOMER,ROLES.MANAGER]},
            ]
          });
        params.email = (params.email).toLowerCase();
        params.password = appUtils.encryptPassword(params.password) ; 
        let result = await userDao.createUser(params);
        if(result && result[1] == false)
          throw exceptions.badRequestError("email already exists ");
        return messages.userCreated;
        
    } catch (error) {
        throw error;
    }
}

userController.login = async (params) => {
    try {
        appUtils.validator({
            container: params,
            fields: [
              { key: 'email', trimmed: true, type: 'email'},
              { key: 'password', trimmed: true, type: 'string'},
            ]
          });
          
        let userData = await userDao.login(params);
        if(!userData)
          throw exceptions.badRequestError(messages.invalidCredentials);
        let passVerified = appUtils.decryptPassword(params.password,userData.password);
        if(!passVerified)
         throw exceptions.badRequestError(messages.invalidCredentials);
        else {
            if( userData.status != STATUS.ACTIVE){
                throw exceptions.unAuthenticatedAccess(messages.inactiveAccount)
            }
            let token = await jwtHandler.generateToken(userData);
            delete userData.password;
            userData.token = token;
        }
        return userData;
    } catch (error) {
        throw error;
    }
}

userController.logout = async (params) => {
    try {
        const resp = await redis.getValue(params.user_id);
        if (resp)
            await redis.deleteKey(params.user_id);
        return messages.loggedOut;
    } catch (e) {
        throw e;
    }
};

module.exports = userController;