//model if single user can have multiple roles

// const DataType = require("sequelize");
// const {sequelize} = require("../config/dbConfig")
// const {STATUS} = require("../constants");

// const Roles = sequelize.define('user_roles', {
//     user_id:  {
//         type: DataType.INTEGER,
//         allowNull: false,
//         references:{
//             model:'users',
//             key:'id'
//         }
//     },
//     role_id: {
//         type: DataType.TINYINT,
//         allowNull: false
//     }
// },
//     {
//         underscored: true,
//     });

// Roles.sync({ alter: false });
// module.exports = Roles;

