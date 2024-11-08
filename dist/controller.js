'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor() {
        this.result = {
            result: ['message'],
            status: 'ok',
            code: "200",
            error: null
        };
    }
    field(name, value) {
        this.result["result"][name] = value;
        return this;
    }
    getField(name) {
        this.result['result'][name] ? this.result['result'][name] : null;
    }
    message(message) {
        this.field('message', message);
        return this;
    }
    setCode(code) {
        this.result["code"] = code;
    }
    setStatus(status) {
        this.result["status"] = status;
    }
    error(error) {
        this.result["error"] = error;
    }
    send(response) {
        response.json(this.result);
    }
    clearError() {
        this.result["error"] = null;
    }
}
exports.default = Controller;
