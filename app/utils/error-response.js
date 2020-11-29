
class ErrorResponse {

    constructor(message, type, data) {
        this.status = false;
        this.message = message;

            this.data = data;

        this.code = type[0];
        this.type = type[1];
    }

}

module.exports = ErrorResponse;
