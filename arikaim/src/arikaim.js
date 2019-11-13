'use strict';
/**
 * Arikaim Services*
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license 
*/

require('./system/global.js')

const express = require('express');
const server = require('http').Server(express);
const io = require('socket.io')(server);

const Config = require('./system/config.js')
const Path = require('./system/path.js')
const container = require('./system/container.js');

module.exports = class Arikaim {

    constructor() {
        this.app = express();    
        this.config = new Config();
        this.version = '1.0.0';     
        this.port = 8080;
        this.devMode = true;
    }
    
    resolve(name) {
        return container.resolve(name);
    }

    getConfig() {
        return config;
    }

    setPort(port) {
        this.port = port;          
    }

    setDevMode(mode) {
        this.devMode = mode;
    }

    init() {
        message('');
        message('Arikam CMS Services','cyan');
        message('version: ' + this.version);
        message('');

        return new Promise((resolve, reject) => {
            this.config.load().then(config => {
                message('Config loaded.');     
                this.setPort(config.port);
                resolve();
            }).catch(error => {
                errorMessage('Error loading config: ' + error);
                reject(error);
            });
        });
    }

    run() {
        this.init().then(result => {
            this.start();
        }).catch(error => {
            errorMessage('Error start server');
            this.exit();
        });
    }

    start() {
        this.app.listen(this.port,() => {
            message('Http server started on port: ' + this.port);
        });
    }

    isInstalled() {
        return true;
    }

    exit() {
        process.exit(0);
    }
}
