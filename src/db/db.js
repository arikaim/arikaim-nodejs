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

class Db {
    #dbConnection;

    constructor() {
        this.#dbConnection = null;
    }

    get connection() {
        return this.#dbConnection;
    }

    async connect(config) {    
        try {
            this.#dbConnection = new Sequelize(config.database, config.username, config.password, {
                host: config.host,
                dialect: config.dialect,
                logging: config.logging
            });

            await this.#dbConnection.authenticate();
            // set global 
            global.sequelize = this.#dbConnection;

            console.log('Db Connection OK.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        return isObject(this.#dbConnection);
    }

    static getInstance() {
        global.db = (global.db === undefined) ? new Db() : global.db;     
        return global.db;  
    }
}

export default Db.getInstance();