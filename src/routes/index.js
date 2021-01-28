//= ========================= Load Modules Start =======================

const resHndlr = require("../core/resHandler");
const { ROUTE_PREFIX,ROLES } = require("../constants");
const userRoute = require("./userRoute");
const transactionRoute = require("./transactionRoute");


//= ========================= Export Module Start ==============================

module.exports = function (app) {
  
  app.use(`${ROUTE_PREFIX}user`, userRoute);
  app.use(`${ROUTE_PREFIX}transaction`,transactionRoute);

  app.use(resHndlr.hndlError);
};

//= ========================= Export Module End ===============================
