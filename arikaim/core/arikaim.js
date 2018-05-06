'use strict';

const express = require('express');
const Config = include('core/system/config.js');
const Utils = include('core/utils/utils.js');
const Db = include('core/system/db.js');
const Routes = include('core/system/routes.js');
const System = include('core/system/system.js');


class Arikaim {

    constructor() {
        this.app = express();
        this.config = new Config();
        this.db = new Db();
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

    init() {
        System.message("Arikam Services version: " + this.version);
        return new Promise((resolve, reject) => {
            this.config.load('config.json').then(config => {
                System.log('Config loaded.');
                this.setPort(config.port);
                this.db.connect(config.db).then(result => {
                    resolve();
                }).catch(error => {
                    console.log('Error connect to database: ' + error);
                    reject(error);
                });
            }).catch(error => {
                console.log('Error loading config: ' + error);
                reject(error);
            });
        });
    }

    run() {
        this.init().then(result => {
            this.start();
        }).catch(error => {
            System.message('Error start server');
        });
    }

    start() {
        this.app.listen(this.port,() => {
            System.message('Server started on port: ' + this.port);
        });
    }

    isInstalled() {
        return true;
    }

    install() {
        this.init().then(result => {
            console.log('install');
            var users = this.db.create('Users');

            this.db.sequelize.sync();

          //  console.log(this.db.sequelize);

          
            
           // console.log(users.model);
           // users.model.sync();
            process.exit(0);
        }).catch(error => {
            System.message('Error install Arikaim Services');
        });
    }
}

module.exports = Arikaim;