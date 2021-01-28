const userDao = {};
const { Users } = require("../models");


userDao.login = async (params) => {
    let condition = {
        where: {
            email: params.email,
        },
        raw: true
    };
    return await Users.findOne(condition);

}

userDao.createUser = async (params) => {

    return await Users.findOrCreate({
        where: {
            email: params.email
        },
        defaults: params,
        raw: true
    });

}

module.exports = userDao;