
class SuccessResponse {
    constructor(data, message) {
        this.status = true;
        this.result = data;

        if (message) {
            this.message = message;
        }
    }
}

module.exports = SuccessResponse;
