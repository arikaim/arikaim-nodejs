'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arikaim Server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
class Uuid {
    static create() {
        var time = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (value) {
            var random = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (value == 'x' ? random : (random & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}
exports.default = Uuid;
