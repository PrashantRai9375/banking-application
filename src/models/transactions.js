const DataType = require("sequelize");
const {sequelize} = require("../config/dbConfig")
const {STATUS} = require("../constants");

const Transactions = sequelize.define('transactions', {
    user_id:  {
        type: DataType.INTEGER,
        references:{
            model:'users',
            key:'id'
        }
    },
    type: {
        type: DataType.TINYINT
    },
    amount: {
        type: DataType.DECIMAL(10,2),
    },
    updated_balance: {
        type: DataType.DECIMAL(10,2)
    },
    status:{
        type:DataType.TINYINT,
        defaultValue: STATUS.ACTIVE
    }
},
    {
        underscored: true,
    });

Transactions.sync({ alter: false });
module.exports = Transactions;

