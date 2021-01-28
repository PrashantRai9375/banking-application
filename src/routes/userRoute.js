//= ========================= Load Modules Start =======================

const userRouter = require("express").Router();
const resHndlr = require("../core/resHandler");
const middleware = require("../middleware/authentication");
const userController = require("../controller/userController");


// ======================== End ======================================== //


userRouter.route("/create")
  .post(async (req, res) => {
    try {
      const result = await userController.createUser(req.body);
      resHndlr.sendSuccessWithMsg(res, result);
    }
    catch (error) {
      resHndlr.sendError(res, error);
    };
  });

//login
userRouter.route("/login")
  .post(async (req, res) => {
    try {
      const result = await userController.login(req.body);
      resHndlr.sendSuccess(res, result);
    }
    catch (error) {
      resHndlr.sendError(res, error);
    };
  });

/**
* Route to logout 
*/
userRouter.route("/logout")
  .delete([middleware.authenticateAndAuthorizeToken()], async (req, res) => {
    try {
      req.body.user_id = req.user.id;
      req.body.token = req.get("Authorization");
      const result = await userController.logout(req.body);
      resHndlr.sendSuccessWithMsg(res, result);
    } catch (err) {
      resHndlr.sendError(res, err);
    }
  });


// Export modules
module.exports = userRouter;

