'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

const fs = require('fs');
const path = require('path');
const System = include('core/system/system.js');

class Services {

    constructor() {

    }

    install() {
        var path = Services.getPath();
        System.message('Install Services');
        var files = fs.readdirSync(path);
        files.forEach((file, index) => {
            var stats = fs.lstatSync(path + file);
            if (stats.isDirectory() == true) {
                this.installService(file);
            }
        });
    }

    installService(name) {
        var path = Services.getPath() + name;
        console.log(path);
        var service = loadServiceConfigFile(name);
    }

    loadServiceConfigFile(name) {
        var config_file = Services.getConfigFile(name);
        var service_config = fs.readFileSync(config_file);
        return JSON.parse(service_config);
    }

    static getConfigFile(name) {
        return Services.getPath() + name + path.sep + 'service.json'
    }

    static getPath() {
        return System.getBasePath() + "services" + path.sep;
    }
    
    static getModelsPath() {
        return Services.getPath() + "models" + path.sep;
    }
}

module.exports = Services;