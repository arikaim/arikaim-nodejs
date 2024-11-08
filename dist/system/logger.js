'use strict';
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Logger_config, _Logger_instance;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arikaim Server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
class Logger {
    constructor() {
        _Logger_config.set(this, void 0);
        _Logger_instance.set(this, void 0);
        __classPrivateFieldSet(this, _Logger_config, {
            transports: [
                new winston_1.default.transports.Console()
            ],
            format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), winston_1.default.format.timestamp({
                format: 'YYYY-MM-DD hh:mm:ss A',
            }), winston_1.default.format.align(), winston_1.default.format.printf((info) => `[${info.timestamp}] ${info.level}:${info.message}`)),
            meta: true,
            expressFormat: true,
            colorize: true,
            ignoreRoute: function (req, res) { return false; }
        }, "f");
    }
    getInstance() {
        if (isEmpty(__classPrivateFieldGet(this, _Logger_instance, "f")) == false) {
            return __classPrivateFieldGet(this, _Logger_instance, "f");
        }
        __classPrivateFieldSet(this, _Logger_instance, winston_1.default.createLogger(__classPrivateFieldGet(this, _Logger_config, "f")), "f");
        return __classPrivateFieldGet(this, _Logger_instance, "f");
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
        return express_winston_1.default.logger(__classPrivateFieldGet(this, _Logger_config, "f"));
    }
}
_Logger_config = new WeakMap(), _Logger_instance = new WeakMap();
exports.default = Logger;
