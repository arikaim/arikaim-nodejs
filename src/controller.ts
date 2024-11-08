'use strict';
/**
 * Arikaim Server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

type Result = {
	[name: string]: any
}


export default class Controller {
     
    private result: {
        result: Result,
        status: string
        code: string
        error: string | null
    };

    constructor() {  
        this.result = {
            result: ['message'],
            status: 'ok',
            code: "200",
            error: null
        }     
    }

    field(name: string, value: any) {
        this.result["result"][name] = value;
        return this;
    }

    getField(name: string) {
        this.result['result'][name] ? this.result['result'][name] : null;
    }

    message(message: string) {
        this.field('message',message);
        return this;
    }

    setCode(code: string) {
        this.result["code"] = code;
    }

    setStatus(status: string) {
        this.result["status"] = status;
    }

    error(error: string) {
        this.result["error"] = error;
    }

    send(response: any) {
        response.json(this.result);
    }

    clearError() {
        this.result["error"] = null;
    }
}
