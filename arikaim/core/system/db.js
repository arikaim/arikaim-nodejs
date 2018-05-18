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
const Model = include('core/system/services.js');

class Db {

    constructor() {
        this.sequelize = null;
    }

    create(model_class_name,service_name) {
        var model_file = Services.getModelFileName(model_class_name,service_name);
        var Model = include(model_file);     

        var obj = new Model(this.sequelize);
        return obj;
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