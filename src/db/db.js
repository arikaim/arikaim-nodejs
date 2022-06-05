'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import { Sequelize } from 'sequelize';

export default class Db {
    #dbConnection;

    constructor() {
        this.#dbConnection = null;
    }

    get connection() {
        return this.#dbConnection;
    }

    async connect(config) {
        this.#dbConnection = new Sequelize(config.database, config.username, config.password, {
            host: 'localhost',
            dialect: 'mysql',
            logging: config.logging
        });

        try {
            await this.#dbConnection.authenticate();
            console.log('Db Connection OK.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        return isObject(this.#dbConnection);
    }
}