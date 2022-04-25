'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

//import "reflect-metadata";
//import typeorm from "typeorm";
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
        console.log('conn');

        this.#dbConnection = new Sequelize(config.database.database, config.database.username, config.database.password, {
            host: 'localhost',
            dialect: 'mysql'
        });

        //this.dbConnection = await typeorm.createConnection(config); 

       // console.log(con);

        /*
        .then(connection => {
            console.log(connection);
           // this.#dbConnection = connection;
           
        }).catch(error => {
            console.log(error);
        });
        */
        return isObject(this.#dbConnection);
    }
}