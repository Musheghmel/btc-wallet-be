const BasicException = require('./basic-exception');
const ErrorResponse = require('./error-response');
const SuccessResponse = require('./success-response');
const logger = require('./logger');


module.exports.log = logger;

module.exports.httpStream = {
    write: (message, encoding) => {
        logger.info(message);
    }
};

module.exports.generateRandomBalance = function() {
  let num = Math.floor(Math.random() * (100 - 1 + 1) + 1);
  return num / 100;
}

module.exports.jsonOutHandler = function (err, result, out, wrapResult = true) {
    let response;
    if (err) {
        if (err instanceof BasicException) {
            response = new ErrorResponse(err.message, [err.code, err.type], err.data);
            logger.error(err.message);
        } else if (err instanceof Error) {
            response = new ErrorResponse(err.toString(), BasicException.Type.ERROR_SYSTEM);
            logger.error(err.toString());
            
            logger.error(err.name);
            logger.error(err.stack);

        } else if (typeof err === 'string') {
            response = new ErrorResponse(err, BasicException.Type.ERROR_UNKNOWN_FROM_STRING);
            logger.error(err);
        } else {
            response = new ErrorResponse("Unknown error", BasicException.Type.ERROR_UNKNOWN);
            logger.error(err);
        }
    } else {
        if (wrapResult) {
        response = new SuccessResponse(result);
        } else {
            response = result;
        }

    }

    out.json(response);
};

module.exports.endpoint = fn =>
    (req, res) => {
        Promise.resolve(fn(req, res))
            .catch((err) => {
                this.jsonOutHandler(err, res, res);
            });
    };
