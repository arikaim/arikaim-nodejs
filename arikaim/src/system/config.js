'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

const file = require('fs');
const Path = require('./path.js');

module.exports = class Config {

    constructor() {
        this.config = {};
    }

    load(fileName) {
        fileName = getDefaultValue(fileName,'services-config.json');
        fileName = Path.getConfigPath() + fileName;
    
        return new Promise((resolve, reject) => {
            file.readFile(fileName, 'utf8',(error, data) => {
                if (error == true) {
                    reject(error);
                } else {
                    this.config = JSON.parse(data);
                    resolve(this.config);
                }
            });
        });
    }

    getConfig() {
        return this.config;
    }    
}
