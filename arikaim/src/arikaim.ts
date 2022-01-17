'use strict';
/**
 * Arikaim Services*
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license 
*/

import * as express from 'express';


//const io = require('socket.io')(server);

//const Config = require('./system/config.js')
//const Path = require('./system/path.js')
//const container = require('./system/container.js');
//const Db = require('./db/db.js');

class Arikaim {
    express: any;
    config: object;
    version: string;
    port: number;

    constructor() {
        this.express = express();    
        //this.config = new Config();
        this.version = '1.0.0';     
        this.port = 8080; 
    }
    
    getConfig() {
        return this.config;
    }

    setPort(port: number) {
        this.port = port;          
    }

    init() {
        console.log('');
        console.log('Arikam CMS Services','cyan');
        console.log('version: ' + this.version);
        console.log('');

        return new Promise<boolean | string>((resolve, reject) => {
            resolve(true);
        });
        /*
        return new Promise((resolve, reject) => {
            this.config.load().then(config => {
                console.log('Config loaded.');     
                this.setPort(config.port);
                resolve();
            }).catch(error => {
                console.log('Error loading config: ' + error);
                reject(error);
            });
        });
        */
       
    }

    run() {
        this.init().then(result => {
            this.start();
        }).catch(error => {
            console.log('Error start server');
            this.exit();
        });
    }

    start() {
        console.log('Database connection.');
        /*
        this.db.connect(this.config.getDatabaseConfig()).then(() => {
            this.startHttpServer()
        }).catch((err) => {
            errorMessage(err);
        });
        */
    }

    startHttpServer() {
        this.express.listen(this.port,() => {
            console.log('Http server started on port: ' + this.port);
        });
    }

    isInstalled() {
        return true;
    }

    exit() {
        process.exit(0);
    }
}
