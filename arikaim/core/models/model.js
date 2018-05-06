'use strict';

class Model {

    constructor(sequelize) {
        this.model = null;
        this.define(sequelize);
    }
    
    define(sequelize) {
        throw("Abstract method!");
        return false;
    }
}

module.exports = Model;