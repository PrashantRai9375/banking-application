const path = require('path');
 
module.exports = {

    ROUTE_PREFIX: "/banking/assignment/v1/",
    STATUS_CODE: {
        ERROR: 0,
        SUCCESS: 1,
        INVALID_TOKEN: 1000
    },
    RESPONSE_STATUS: {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500
    },
    ERROR_TYPE: {
        NOT_FOUND: 'NotFoundError',
        UNAUTHORIZED: 'AuthFailureError',
        INTERNAL: 'InternalError',
        BAD_REQUEST: 'BadRequestError',
        FORBIDDEN: 'ForbiddenError'
    },
    STATUS: {
        DELETED: 0,
        ACTIVE: 1,
        INACTIVE: 2
    },
    ROLES: {
        CUSTOMER: 1,
        MANAGER: 2
    },
    TRANSACTION_TYPE: {
        CREDIT: 1,
        DEBIT: 2
    },
    EMAIL_SUBJECTS: {
        CREDIT: "Credited in your account",
        DEBIT: "Debited from your account"
    }
}
