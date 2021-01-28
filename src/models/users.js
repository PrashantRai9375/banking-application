const DataType = require("sequelize");
const {sequelize} = require("../config/dbConfig")
const {STATUS,ROLES} = require("../constants");

const Users = sequelize.define('users', {
    email: {
        type: DataType.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataType.STRING,
        allowNull: false
    },
    name:{
        type:DataType.STRING,
        allowNull: false
    },
    balance: {
        type: DataType.DECIMAL(8,2),
        defaultValue: 0,
        allowNull: false
    },
    role: {
        type: DataType.TINYINT,
        allowNull: false
    },
    status:{
        type:DataType.TINYINT,
        defaultValue: STATUS.ACTIVE,
        allowNull: false
    }
},
    {
        underscored: true,
    });

Users.sync({ alter: false });
module.exports = Users;

