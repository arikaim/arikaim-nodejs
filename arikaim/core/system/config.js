'use strict';

const file = require('fs');
const System = include('core/system/system.js');

class Config {

    constructor() {
        this.config = {};
    }

    load(file_name,onDone) {
        var config_file_name = System.getConfigPath() + file_name;
        file.readFile(config_file_name, 'utf8',(err, data) => {
            this.config = JSON.parse(data);
            callFunction(onDone,this.config);
        });
    }

    getConfig() {
        return this.config;
    }
}

module.exports = Config;