'use strict';

const Sequelize = require('sequelize');

class Db {

    constructor() {
        this.sequelize = null;
    }

    create(model_class_name) {
        var model_file_name = model_class_name.toLowerCase() + '.js';
        var Model = include('core/models/' + model_file_name);

        var obj = new Model(this.db);
      
        console.log('Create ' + model_class_name);
     //   obj.define(this.db);
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