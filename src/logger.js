'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import winston from 'winston';
import expressWinston from 'express-winston';

export function createLogger() {
    return winston.createLogger({
        level: 'info',      
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
        ],
    });
}

export function createExpressLogger() {
    return expressWinston.logger({
        transports: [
                new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp({
                format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            }),
            winston.format.align(),
            winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
        ),
        meta: true, 
        expressFormat: true, 
        colorize: true, 
        ignoreRoute: function (req, res) { return false; } 
    });
}