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
import Access from './access/access.js';
import Queue from './queue/queue.js';
import express from 'express'
import path from 'path';
import { Server } from "socket.io";
import * as http from "http";

/**
 *  Server class
 */
export default class ArikaimServicesServer {
    #config = null;
    #express = null;
    #httpServer = null;
    #socketServer = null;

    constructor() {
    }

    async boot() {
        // init auth
        var access = new Access();

        this.#express = express();
        // web socket server
        this.#httpServer = http.createServer(this.#express);
        this.#socketServer = new Server(this.#httpServer,this.#config.socket.cors);
        // ser global var    
        global.io = this.#socketServer;

        this.#socketServer.on('connection',(socket) => {
            console.log('socket connected');
        });
       
        // init db
        const db = new Db();
        await db.connect(this.#config.database);
        global.sequelize = db.connection;
        // load service routes
        this.loadServices();

        // start queue
        var queue = new Queue();
        await queue.boot();
        
        global.queue = queue;
        queue.run();
    }

    run() {
        // http server
        this.#httpServer.listen(this.#config.port,this.#config.host,() => {
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
