'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arikaim Server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
 *
*/
const fs_1 = require("fs");
const php_unserialize_1 = __importDefault(require("php-unserialize"));
class Utils {
    static readPHPSession(id, storageFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            var fileName = storageFolder + '/sess_' + id;
            try {
                var data = yield (0, fs_1.readFileSync)(fileName, 'utf8');
            }
            catch (error) {
                return false;
            }
            return php_unserialize_1.default.unserializeSession(data);
        });
    }
}
exports.default = Utils;
