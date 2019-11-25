'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
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

    
}

module.exports = Db;