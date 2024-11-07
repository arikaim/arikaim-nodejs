'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
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

    close() {
        if (isEmpty(this.connection) == false) {
            this.connection.close();
        }
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
          } catch (error) {
            errorMessage('Unable to connect to the database:', error);
        }

        return isObject(this.#dbConnection);
    }

    static getInstance() {
        global.db = (global.db === undefined) ? new Db() : global.db;     
        return global.db;  
    }
}

export default Db.getInstance();