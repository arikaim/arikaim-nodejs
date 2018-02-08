'use strict';
const file = require('fs');
const System = include('core/system/system.js');

class Config {

    constructor() {
        this.config = {};
    }

    load(file_name) {
        var config_file_name = System.getConfigPath() + file_name;
        console.log(config_file_name);

        file.readFile(config_file_name, 'utf8',(err, data) => {
            this.config = JSON.parse(data);
        });
    }
}

module.exports = Config;