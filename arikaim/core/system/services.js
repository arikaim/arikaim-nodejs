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
        var files = fs.readdirSync(services_path);
        files.forEach((file, index) => {
            console.log(services_path + file);
            var stats = fs.lstatSync(services_path + file);
            if (stats.isDirectory() == true) {
                this.installService(file);
            }
        });
    }

    

    installService(service_name) {
        console.log('install service ' + service_name);
        var service = this.loadServiceConfigFile(service_name);
        console.log(service);
        var service_model = arikaim.db.createModel('Service');
        //service_model.findAll().then(data => {
         //   console.log(data);
        //});
        this.installServiceModels(service_name);
    }

    installServiceModels(service_name) {
        var models_include_path = System.getModelsIncludePath(service_name);
        var models_path = System.getModelsPath(service_name);
        console.log(models_include_path);
        var files = fs.readdirSync(models_path);
        files.forEach((file, index) => {
            var model = arikaim.db.createModel(models_include_path + file);
        });
        arikaim.db.sequelize.sync().then(resut => {
            System.message('Service db tables created.');
        }).catch(error => {
            System.message('Error create service database tables!');
            arikaim.exit();
        });
    }

    loadServiceConfigFile(service_name) {
        var config_file = Services.getConfigFile(service_name);
        var service_config = fs.readFileSync(config_file);
        return JSON.parse(service_config);
    }

    static getConfigFile(serice_name) {
        return System.getServicePath(serice_name) + 'service.json';
    }

}

module.exports = Services;