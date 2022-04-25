'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import  * as globalVars from './system/global.js';
import { readFileSync, readdirSync, statSync } from 'fs';
import Path from './system/path.js';
import Db from './db/db.js';
import express from 'express'
import path from 'path';
import { dir } from 'console';

//import Users from "./db/models/users.js";

/**
 *  Server class
 */
export default class ArikaimServicesServer {
    #config = null;
    #express = null;

    constructor() {
    }

    async boot() {
        this.#express = express();

        const db = new Db();
        var result = await db.connect(this.#config.database);

        if (result == false) {
            errorMessage('Error connect to db.');
        } else {
            console.log('Db ok');
        }
       
        this.loadServices();
       

       // const userRepository = db.connection.getRepository(Users);

    }

    run() {
        this.#express.listen(this.#config.port,this.#config.host,() => {
            console.log('Server started at ' + this.#config.host + ":" + this.#config.port);
        });
    }

    loadServices() {
        const router = express.Router();

        console.log('Load services');
        var servicesPath = Path.getServicesPath();

        var services = readdirSync(servicesPath).filter(function (file) {
            return statSync(servicesPath + path.sep + file).isDirectory();
        });

        services.forEach(async (dir) => {
            var serviceFile = servicesPath + dir + path.sep + dir + '.js';
            var { default: serviceClass } = await import(serviceFile);
       
            var service = new serviceClass(router);
            service.boot();
            this.#express.use('/api/service/',service.router);
        });
    }

    loadConfig(fileName) {
        fileName = getDefaultValue(fileName,'services-config.json');
        fileName = Path.getConfigPath() + fileName;
        var data = readFileSync(fileName,'utf8');   

        if (isJSON(data) == true) {
            this.#config = JSON.parse(data);
            message('Config file: ' + fileName + ' loaded ','green');
            return true
        }
        
        errorMessage('Error loading config file: ' + fileName);
        return false;
    }
}
