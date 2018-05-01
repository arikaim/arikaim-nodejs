'use strict';

const file = require('fs');
const System = include('core/system/system.js');

class Config {

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

module.exports = Config;