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
const System = include('core/system/system.js');

class Services {

    constructor() {

    }

    install() {
        var services_path = System.getServicePath();
        System.message('Install Services');
        var files = fs.readdirSync(services_path);
        files.forEach((file, index) => {
            var stats = fs.lstatSync(services_path + file);
            if (stats.isDirectory() == true) {
                this.installService(file);
            }
        });
    }

    installService(name) {
        var service = loadServiceConfigFile(name);
    }

    installServiceModels(name) {
        var models_path = System.getModelsPath(name);
        var files = fs.readdirSync(models_path);
        files.forEach((file, index) => {
            var file_name = models_path + file;
            //var model = 
        });
    }

    loadServiceConfigFile(name) {
        var config_file = Services.getConfigFile(name);
        var service_config = fs.readFileSync(config_file);
        return JSON.parse(service_config);
    }

    static getConfigFile(serice_name) {
        return System.getServicePath(serice_name) + 'service.json';
    }

}

module.exports = Services;