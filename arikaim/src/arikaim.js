'use strict';
/**
 * Arikaim Services*
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license 
*/

const express = require('express');

const container = require('./core/system/container.js');
const System = container.resolve('System');
const Path = container.resolve('Path');
const config = container.resolve('Config')


module.exports = class Arikaim {

    constructor() {
        this.app = express();    
        this.version = '1.0.0';     
        this.port = 8080;
        this.devMode = true;
    }
    
    getConfig() {
        return config;
    }

    setPort(port) {
        if (isEmpty(port) == false) {
            this.port = port;          
        } 
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
            this.config.load('config.json').then(config => {
                message('Config loaded.');
                this.setPort(config.port);
               

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
            message('Server started on port: ' + this.port);
        });
    }

    isInstalled() {
        return true;
    }

    exit() {
        process.exit(0);
    }
}
