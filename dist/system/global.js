'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
const logger_js_1 = __importDefault(require("./logger.js"));
const url_js_1 = __importDefault(require("../utils/url.js"));
global.logger = new logger_js_1.default();
global.url = new url_js_1.default();
