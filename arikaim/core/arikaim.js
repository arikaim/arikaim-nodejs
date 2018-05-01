'use strict';

const express = require('express');
const Config = include('core/system/config.js');
const Utils = include('core/utils/utils.js');
const Db = include('core/system/db.js');
const Routes = include('core/system/routes.js');
const System = include('core/system/system.js');


class Arikaim {

    constructor() {
        this.config = new Config();
        this.db = new Db();
        this.app = express();
        this.routes = new Routes(this.app);

        this.dev_mode = true;
        this.version = '1.0';
        this.self = this;
        this.port = 8080;
    }
    
    setPort(port) {
        if (isEmpty(port) == false) {
            this.port = port;
            return true;
        }
        return false;
    }

    setDevMode(mode = true) {
        this.dev_mode = mode;
    }

    log(msg) {
        if (this.dev_mode == true) {
            console.log(msg);
        }
    }

    run() {
        System.message("Arikam Services version: " + this.version);
        this.config.load('config.json')
        .then(config => {
            System.log('Config loaded.');
            this.setPort(config.port);
            this.db.connect(config.db)
            .then(result => {
                this.start();
            });
        }).catch(() => {
            System.log('Error loading config.');
        });
    }

    start() {
        this.app.listen(this.port,() => {
            System.message('Server started on port: ' + this.port);
        });
    }
}

module.exports = Arikaim;