'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import '@arikaim/arikaim/common/global.js';
import '@arikaim/arikaim-server/system/global.js';
import Path from '@arikaim/arikaim/common/path.js';
import { readdirSync, statSync } from 'fs';

import { loadConfig } from './system/config.js';
import db from './db/db.js';
import access from './access/access.js';
import queue from './queue/queue.js';
import View from './view/view.js';
import CoreApiService from './core-api/service.js';

import express from 'express'
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as http from "http";
import { exit } from 'process';

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
        writeLn('Server boot...');
        // load server config 
        this.#config = await loadConfig();
        if (this.#config === false) {           
            exit();
        };

        // init db      
        await db.connect(this.#config.database);
        // init auth
        await access.init();     
       
        // init template engine
        const view = View.create(this.#config.settings.primaryTemplate);

        // init express
        this.#express = express();
        this.#express.use(cookieParser());      
        this.#express.use(cors(this.#config.cors));
        this.#express.use((req, res, next) => {
            url.setHost(req.protocol + '://' + req.headers.host);

            res.renderPage = (name,params,language) => {              
                const html = view.renderPage(name,params,language);
                res.send(html);
            };
       
            next();
        });
        // static files
        this.#express.use(express.static(Path.templatesPath));
        this.#express.use(express.static(Path.librariesPath));
        this.#express.use(express.static(Path.storagePublicPath));
        // logger 
        this.#express.use(logger.getExpressMiddleware());
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
        const router = express.Router();      
        var service;

        // load core api routes
        service = new CoreApiService(router,this.#httpServer,this.#config);
        await service.boot();
        this.#express.use('/',service.router);

        writeLn('Load services ...','green');    
        var servicesPath = Path.getServicesPath();

        var services = await readdirSync(servicesPath).filter(function (file) {
            return statSync(servicesPath + path.sep + file).isDirectory();
        });

        for (var dir of services) {
            var serviceFile = servicesPath + dir + path.sep + dir + '.js';
            var { default: serviceClass } = await import(serviceFile);
       
            service = new serviceClass(router,this.#httpServer,this.#config);
            await service.boot();
            this.#express.use('/',service.router);
            writeLn('Loaded ' + dir);
        }
    }
}
