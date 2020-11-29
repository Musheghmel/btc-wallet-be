const BasicException = require('./basic-exception');

class Exception extends BasicException {
    constructor(message, type, data) {
        super(message, type, data);
        
        const err = new Error();
        const stack = err.stack.split('\n');
    }
}

Exception.Type = BasicException.Type;
module.exports = Exception;
