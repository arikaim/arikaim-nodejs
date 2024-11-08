'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
/**
 * Arikaim Server server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
const path_js_1 = __importDefault(require("@arikaim/arikaim/common/path.js"));
const file_js_1 = require("@arikaim/arikaim/common/file.js");
function loadConfig(fileName) {
    fileName = path_js_1.default.config() + getDefaultValue(fileName, 'services-config.json');
    var data = file_js_1.File.readJSONFile(fileName);
    if (data !== false) {
        return data;
    }
    return false;
}
