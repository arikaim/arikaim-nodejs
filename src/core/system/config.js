'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

const file = require('fs');
const System = require('system.js');

module.exports = class Config {

    constructor() {
        this.config = {};
    }

    load(file_name) {
        var config_file_name = System.getConfigPath() + file_name;
        return new Promise((resolve, reject) => {
            file.readFile(config_file_name, 'utf8',(error, data) => {
                if (error == true) {
                    reject();
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
