'use strict';

class Model {

    constructor(sequelize) {
        this.model = null;
        this.define(sequelize);
    }
    
    define(sequelize) {
    }
}

module.exports = Model;