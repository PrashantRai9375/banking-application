
const transactionRouter = require('express').Router();
const resHndlr = require("../core/resHandler");
const middleware = require("../middleware/authentication");
const transactionController = require("../controller/transactionController");
const { ROLES } = require('../constants');




transactionRouter.route("/deposit")
    .post([middleware.authenticateAndAuthorizeToken([ROLES.CUSTOMER])],async (req, res) => {
        try {
            req.body.user_id = req.user.id;
            const result = await transactionController.deposit(req.body);
            resHndlr.sendSuccessWithMsg(res, result);
        }
        catch (error) {
            resHndlr.sendError(res, error);
        };
    });

transactionRouter.route("/withdraw")
    .post([middleware.authenticateAndAuthorizeToken([ROLES.CUSTOMER])],async (req, res) => {
        try {
            req.body.created_by = req.body.updated_by = req.body.user_id = req.user.id;
            const result = await transactionController.withdraw(req.body);
            resHndlr.sendSuccessWithMsg(res, result);
        }
        catch (error) {
            resHndlr.sendError(res, error);
        };
    });

transactionRouter.route("/balanceEnquiry")
    .get([middleware.authenticateAndAuthorizeToken([ROLES.CUSTOMER])],async (req, res) => {
        try {
            req.query.user_id = req.user.id;
            const result = await transactionController.getBalance(req.query);
            resHndlr.sendSuccess(res, result);
        } catch (err) {
            resHndlr.sendError(res, err);
        }
    });

transactionRouter.route("/report")
    .get([middleware.authenticateAndAuthorizeToken([ROLES.MANAGER])],async (req, res) => {
        try {
            const result = await transactionController.getTransactionReport(req.query);
            resHndlr.sendSuccess(res, result);
        } catch (err) {
            resHndlr.sendError(res, err);
        }
    });

// Export modules
module.exports = transactionRouter;

