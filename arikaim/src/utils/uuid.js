'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

module.exports = class Uuid {

    static create() {
        var time = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(value) {
            var random = (time + Math.random()*16)%16 | 0;
            time = Math.floor(time/16);
            return (value == 'x' ? random : (random&0x3|0x8)).toString(16);
        });
        return uuid;
    }
}