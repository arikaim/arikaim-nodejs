'use strict';

const Sequelize = require('sequelize');

class Db {

    constructor() {
        this.db = null;
    }

    connect(settings) {
        return new Promise((resolve, reject) => {
            this.db = new Sequelize(settings);
            this.db.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        });
    }
}

module.exports = Db;