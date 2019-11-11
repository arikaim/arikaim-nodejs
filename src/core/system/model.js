'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

class Model {

    constructor(sequelize) {
        this.model = null;
        this.define(sequelize);
        return this.model;
    }
    
    define(sequelize) {
        throw("Abstract method!");
        return false;
    }

}

module.exports = Model;