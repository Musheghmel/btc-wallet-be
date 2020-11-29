
const ErrorCodes = {
    NONE: 0,
    ASSERTION: 1,
    API_NOT_FOUND: 404,
    NOT_FOUND: 404,
    NO_ACCESS: 403,
    UNAUTHORIZED: 401,
    TOO_MANY_REQUESTS: 429,
    DB: 551,
    VALIDATION: 552,
    SYSTEM: 553,
    UNKNOWN: 555,
    UNKNOWN_FROM_STRING: 556,
    NETWORK: 557,
    EXISTS: 409,
    NEED_VERIFICATION_VIA_EMAIL: 559,
    SERVICE_UNAVAILABLE: 503
};


const ErrorTypes = {
    ERROR_NONE: [ErrorCodes.NONE, "ERROR_NONE"],
    ERROR_ASSERTION: [ErrorCodes.ASSERTION, "ERROR_ASSERTION"],
    ERROR_API_NOT_FOUND: [ErrorCodes.API_NOT_FOUND, "ERROR_API_NOT_FOUND"],
    ERROR_NOT_FOUND: [ErrorCodes.NOT_FOUND, "ERROR_NOT_FOUND"],
    ERROR_UNAUTHORIZED: [ErrorCodes.UNAUTHORIZED, "ERROR_UNAUTHORIZED"],
    ERROR_UNAUTHORIZED_IN_HOST: [ErrorCodes.UNAUTHORIZED, "ERROR_UNAUTHORIZED"],
    ERROR_TOO_MANY_REQUESTS: [ErrorCodes.TOO_MANY_REQUESTS, "ERROR_TOO_MANY_REQUESTS"],
    ERROR_DB: [ErrorCodes.DB, "ERROR_DB"],
    ERROR_VALIDATION: [ErrorCodes.VALIDATION, "ERROR_VALIDATION"],
    ERROR_SYSTEM: [ErrorCodes.SYSTEM, "ERROR_SYSTEM"],
    ERROR_UNKNOWN: [ErrorCodes.UNKNOWN, "ERROR_UNKNOWN"],
    ERROR_UNKNOWN_FROM_STRING: [ErrorCodes.UNKNOWN_FROM_STRING, "ERROR_UNKNOWN_FROM_STRING"],
    ERROR_NETWORK: [ErrorCodes.NETWORK, "ERROR_NETWORK"],
    ERROR_EXISTS: [ErrorCodes.EXISTS, "ERROR_EXISTS"],
    ERROR_SERVICE_UNAVAILABLE: [ErrorCodes.SERVICE_UNAVAILABLE, "ERROR_SERVICE_UNAVAILABLE"],
};


class BasicException {
    constructor(message, type, data) {
        this.message = message;
        this.type = type[1];
        this.code = type[0];

        if (data) {
            this.data = data;
        }
        
    }
}


BasicException.Type = ErrorTypes;
BasicException.Code = ErrorCodes;

module.exports = BasicException;
