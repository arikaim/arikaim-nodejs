'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

const path = require('path');
const System = include('core/system/system.js');
const Services = include('core/system/services.js');

class Model {

    constructor(sequelize) {
        this.model = null;
        this.define(sequelize);
    }
    
    define(sequelize) {
        throw("Abstract method!");
        return false;
    }

    static create(model_class_name,service_name) {
        var model_file = Services.getModelFileName(model_class_name,service_name);
        var Model = include(model_file);     

        var obj = new Model(this.sequelize);
        return obj;
    }

    static getModelFileName(model_class_name,service_name) {
        var file_name = model_class_name.toLowerCase() + '.js';
        if (isEmpty(service_name) == false) {
            return Services.getModelsPath(service_name) + file_name;
        } 
        return System.getBasePath() + 'core' + path.sep + 'models' + path.sep + file_name;
    }
}

module.exports = Model;