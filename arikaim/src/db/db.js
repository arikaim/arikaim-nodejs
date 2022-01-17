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

module.exports = class Db {

    constructor() {
        this.sequelize = null;
    }

    connect(config) {
        message(config);
        this.sequelize = new Sequelize(config);
        return this.sequelize.authenticate();
    }
}