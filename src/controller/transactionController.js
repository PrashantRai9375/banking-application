const transactionController = {};
const transactionDao = require("../dao/transactionDao");
const exceptions = require("../core/customExceptions");
const messages = require("../messages");
const {  TRANSACTION_TYPE, EMAIL_SUBJECTS } = require("../constants");
const { appUtils } = require("../utils");
const json2xls = require('json2xls');
const fs = require('fs');
const path = require('path');
const { sendEmail } = require('../core/mailService');


transactionController.deposit = async (params) => {
    try {
        appUtils.validator({
            container: params,
            fields: [
                { key: 'amount', required: true, type: 'number' },
            ]
        });
        params.type = TRANSACTION_TYPE.CREDIT;
        let result = await transactionDao.deposit(params);
        //mail sending logic
        params.email = result.email;
        params.user_name = result.name;
        params.subject = EMAIL_SUBJECTS.CREDIT;
        params.transaction_type = "credited"
        params.updated_balance = parseFloat(result.balance) + parseFloat(params.amount);
        sendEmail(params);
        return messages.credited;
    } catch (error) {
        throw error;
    }
}

transactionController.withdraw = async (params) => {
    try {
        appUtils.validator({
            container: params,
            fields: [
                { key: 'amount', required: true, type: 'number' },
            ]
        });
        params.type = TRANSACTION_TYPE.DEBIT;
        params.amount = parseFloat(params.amount);
        let result = await transactionDao.withdraw(params);
        //mail sending logic
        params.email = result.email;
        params.user_name = result.name;
        params.subject = EMAIL_SUBJECTS.DEBIT;
        params.transaction_type = "debited"
        params.updated_balance = parseFloat(result.balance) - parseFloat(params.amount);
        sendEmail(params);
        return messages.debited;
    } catch (error) {
        throw error;
    }
}

transactionController.getBalance = async (params) => {
    try {
        return await transactionDao.getBalance(params);
    } catch (error) {
        throw error;
    }
}

transactionController.getTransactionReport = async (params) => {
    try {
        params.from_date = new Date(params.from_date);
        params.to_date = new Date(new Date(params.to_date).getTime() + 1 * 24 * 60 * 60 * 1000);
        if (params.from_date > params.to_date)
            throw exceptions.badRequestError(messages.dateValidation);
        appUtils.validator({
            container: params,
            fields: [
                { key: 'user_id', required: false, type: 'id' },
            ]
        })
        let result = await transactionDao.getTransactionReport(params);

        var xls = json2xls(result);
        let current_time = +new Date;
        let filePath = path.resolve(__dirname, "../../transaction_reports");
        fs.writeFileSync(`${filePath}/${current_time}_data.xlsx`, xls, 'binary');
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = transactionController;