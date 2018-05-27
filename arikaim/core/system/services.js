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
        System.message('Install Services');
       
        var services_path = System.getServicePath();
        console.log(services_path);

        var files = fs.readdirSync(services_path);
        files.forEach((file, index) => {
            console.log(services_path + file);
            var stats = fs.lstatSync(services_path + file);
            if (stats.isDirectory() == true) {
                console.log('install serv:' + file);
                this.installService(file);
            }
        });
    }

    installService(name) {
        var service = this.loadServiceConfigFile(name);
        this.installServiceModels(name);
    }

    installServiceModels(name) {
        var models_path = System.getModelsPath(name);
        console.log(models_path);

        var files = fs.readdirSync(models_path);
        files.forEach((file, index) => {
            var file_name = models_path + file;
            console.log(file_name);
            //var model = 
            var model = arikaim.db.createModel(file_name);
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