const transactionDao = {};
const { Transactions, Users } = require("../models");
const { sequelize } = require("../config/dbConfig");
const { exceptions } = require("../core");
const messages = require("../messages");
const {Op} = require('sequelize');


transactionDao.deposit = async (params) => {
    try {
        return await sequelize.transaction(async (t) => {

            const user = await Users.findOne({
                where: {
                    id: params.user_id
                },
                raw: true
            }, { transaction: t });

            params.updated_balance = parseFloat(user.balance) + parseFloat(params.amount);

            await Transactions.create(params, { transaction: t });
            
            await Users.update({
                balance: params.updated_balance
            }, {
                where: {
                    id: params.user_id
                },
                transaction: t 
            });
            return user;
            
        });
    } catch (error) {
        throw error;
    }
}

transactionDao.withdraw = async (params) => {
    try {
        return await sequelize.transaction(async (t) => {

            const user = await Users.findOne({
                where: {
                    id: params.user_id
                },
                raw: true
            }, { transaction: t });
            let current_balance = parseFloat(user.balance);
            if(current_balance < params.amount)
                throw exceptions.badRequestError(messages.insufficinetBalance);

            params.updated_balance =  current_balance - params.amount;
            
            await Transactions.create(params, { transaction: t });
            
            await Users.update({
                balance: params.updated_balance
            }, {
                where: {
                    id: params.user_id
                },
                transaction: t 
            });
            return user;
        });
    } catch (error) {
        throw error;
    }
}

transactionDao.getBalance = async (params) => {
    return await Users.findOne(
        {
            attributes: ['id', 'name', 'balance'],
            where: {
                id: params.user_id
            },
            raw: true
        })
}

transactionDao.getTransactionReport = async (params) => {
    let condition = {
        where: {
            [Op.or]:{
                created_at: {
                    [Op.between]: [params.from_date,params.to_date]
                },    
            }
            
        },
        raw: true
    };
    if (params.user_id)
        condition.where.user_id = params.user_id;

    return await Transactions.findAll(condition);
}

module.exports = transactionDao;