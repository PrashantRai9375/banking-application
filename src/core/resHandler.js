const APIResponse = require("./APIResponse");
const exception = require("./customExceptions");
const { STATUS_CODE, ERROR_TYPE, RESPONSE_STATUS } = require("../constants");

let result;

function sendResponse(res, rslt) {
  err = rslt && rslt.error;
  if (err) {
    switch (err.errorType) {
      case ERROR_TYPE.UNAUTHORIZED:
        return res.send(RESPONSE_STATUS.UNAUTHORIZED, rslt);
      case ERROR_TYPE.INTERNAL:
        return res.send(RESPONSE_STATUS.INTERNAL_ERROR, rslt);
      case ERROR_TYPE.BAD_REQUEST:
        return res.send(RESPONSE_STATUS.BAD_REQUEST, rslt);
      case ERROR_TYPE.FORBIDDEN:
        return res.send(RESPONSE_STATUS.FORBIDDEN, rslt);
      case ERROR_TYPE.NOT_FOUND:
        return res.send(RESPONSE_STATUS.NOT_FOUND, rslt);  
      default:
        console.log("default error type");
    }
  }
  // send status code 200
  return res.send(RESPONSE_STATUS.SUCCESS, rslt);
}

function sendError(res, err) {
  if (!err.errorType) {
    err = exception.internalServerError(err)
  }
  result = new APIResponse(STATUS_CODE.ERROR, err);
  sendResponse(res, result);
}

function hndlError(err, req, res, next) {
  // unhandled error
  sendError(res, err);
}

function sendSuccess(res, result) {
  result = new APIResponse(STATUS_CODE.SUCCESS, result);
  sendResponse(res, result);
}

function sendSuccessWithMsg(res, msg) {
  rslt = { message: msg };
  result = new APIResponse(STATUS_CODE.SUCCESS, rslt);
  sendResponse(res, result);
}

module.exports = {
  sendResponse,
  sendError,
  hndlError,
  sendSuccess,
  sendSuccessWithMsg
}