'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import winston from 'winston';
import expressWinston from 'express-winston';


export default class Logger {
    #config
    #instance;

    constructor() {
        this.#config = {
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss A',
                }),
                winston.format.align(),
                winston.format.printf((info) => `[${info.timestamp}] ${info.level}:${info.message}`)
            ),
            meta: true, 
            expressFormat: true, 
            colorize: true, 
            ignoreRoute: function (req, res) { return false; } 
        };
    }

    getInstance() {
        if (isEmpty(this.#instance) == false) {
            return this.#instance;
        }

        this.#instance = winston.createLogger(this.#config);
        return this.#instance;
    }

    log(msg) {
        this.getInstance().log(msg);
    }

    info(msg) {
        this.getInstance().info(msg);
    }

    error(msg) {
        this.getInstance().error(msg);
    }

    warn(msg) {
        this.getInstance().warn(msg);
    }

    getExpressMiddleware() {
        return expressWinston.logger(this.#config);
    }
}
