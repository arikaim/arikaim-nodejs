'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import './system/global.js';
import { readFileSync, readdirSync, statSync } from 'fs';
import Path from './system/path.js';
import db from './db/db.js';
import access from './access/access.js';
import queue from './queue/queue.js';
import express from 'express'
import path from 'path';
import * as http from "http";
import SocketServer from './socket-server.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

/**
 *  Server class
 */
export default class ArikaimServicesServer {
    #config = null;
    #express = null;
    #httpServer = null;
   
    constructor() {
    }

    async boot() {
        // load server config 
        await this.loadConfig();

        // init db      
        await db.connect(this.#config.database);
       
        // init auth
        access.init();     
        console.log(access.msg);

        // init express
        this.#express = express();
        this.#express.use(cookieParser());
        this.#express.use(cors(this.#config.cors));

        // web socket server
        this.#httpServer = http.createServer(this.#express);
        global.socketServer = new SocketServer(this.#httpServer,this.#config.socket);
       
        // boot queue
        await queue.boot();
       
        // load services 
        await this.loadServices();              
    }

    run() {
        // http server
        this.#httpServer.listen(this.#config.port,this.#config.host,() => {
            console.log('Server started at ' + this.#config.host + ":" + this.#config.port);
        });

        // start queue
        queue.run();
    }

    async loadServices() {
        process.stdout.write('Load services ');

        const router = express.Router();      
        var servicesPath = Path.getServicesPath();

        var services = await readdirSync(servicesPath).filter(function (file) {
            return statSync(servicesPath + path.sep + file).isDirectory();
        });

        for (var dir of services) {
            var serviceFile = servicesPath + dir + path.sep + dir + '.js';
            var { default: serviceClass } = await import(serviceFile);
       
            var service = new serviceClass(router);
            await service.boot();
            this.#express.use('/api/service/',service.router);
            process.stdout.write('.');
        }
     
        console.log(' Ok');
    }

    async loadConfig(fileName) {
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
