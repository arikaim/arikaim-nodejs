'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

export default class Controller {
    
    #result = {}

    constructor() {  
        this.#result = {
            result: {},
            status: 'ok',
            code: 200,
            errors: []
        }     
    }

    field(name, value) {
        this.#result['result'][name] = value;
    }

    getField(name) {
        this.#result['result'][name] ? this.#result['result'][name] : null;
    }

    message(message) {
        this.field('message',message);
    }

    setCode(code) {
        this.#result.code = code;
    }

    setStatus(status) {
        this.#result.status = status;
    }

    setError(error) {
        this.#result.errors.push(error);
    }

    send(response) {
        response.json(this.#result);
    }

    clearErrors() {
        this.#result.errors = [];
    }
}