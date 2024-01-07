'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import './system/global.js';
import { readdirSync, statSync } from 'fs';
import Path from './system/path.js';
import { default as Config } from './system/config.js';
import db from './db/db.js';
import access from './access/access.js';
import queue from './queue/queue.js';
import view from './view/view.js';

import express from 'express'
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as http from "http";

/**
 *  Server class
 */
export default class ArikaimServicesServer {
    #config = null;
    #express = null;
    #httpServer = null;
    #view = null;

    constructor() {
    }

    async boot() {
        writeLn('Server boot...');
        // load server config 
        this.#config = await Config.loadConfig();

        if (this.#config === false) {           
            return false;
        };

        // init db      
        await db.connect(this.#config.database);
        // init auth
        await access.init();     
       
        // init template engine
        view.boot();

        // init express
        this.#express = express();
        this.#express.use(cookieParser());      
        this.#express.use(cors(this.#config.cors));

        // web server
        this.#httpServer = http.createServer(this.#express);

        // boot queue
        await queue.boot();
        // load services 
        await this.loadServices(); 
         
        return true;            
    }

    run() {
        // http server
        this.#httpServer.listen(this.#config.port,this.#config.host,() => {
            writeLn('Server started at ' + this.#config.host + ":" + this.#config.port,'green');
        });
    }

    async loadServices() {
        writeLn('Load services ...');

        const router = express.Router();      
        var servicesPath = Path.getServicesPath();

        var services = await readdirSync(servicesPath).filter(function (file) {
            return statSync(servicesPath + path.sep + file).isDirectory();
        });

        for (var dir of services) {
            var serviceFile = servicesPath + dir + path.sep + dir + '.js';
            var { default: serviceClass } = await import(serviceFile);
       
            var service = new serviceClass(router,this.#httpServer,this.#config);
            await service.boot();
            this.#express.use('/',service.router);
            writeLn('Loaded ' + dir);
        }
    }
}
