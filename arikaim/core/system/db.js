'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

const Sequelize = require('sequelize');
const Model = include('core/system/model.js');
const System = include('core/system/system.js');

class Db {

    constructor() {
        this.sequelize = null;
    }

    create(model_class_name,service_name) {
        var model_file = this.getModelFileName(model_class_name,service_name);
        return this.createModel(model_file);
    }

    createModel(model_file) {
        console.log('include:' + model_file);
        var Model = include(model_file);     
      //  console.log(this.sequelize);
        var obj = new Model(this.sequelize);
        console.log(obj);
        return obj;
    }

    getModelFileName(model_class_name,service_name) {
        var file_name = model_class_name.toLowerCase() + '.js';
        return System.getModelsIncludePath(service_name) + file_name;
    }

    connect(settings) {
        return new Promise((resolve, reject) => {
            this.sequelize = new Sequelize(settings);
            this.sequelize.authenticate()
            .then(() => {
                console.log('Db Connection has been established successfully.');
                resolve();
            })
            .catch(error => {
                console.log('Unable to connect to the database:' + error);
            });
        });
    }

}

module.exports = Db;