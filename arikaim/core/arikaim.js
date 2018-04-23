'use strict';

const express = require('express');
const Config = include('core/system/config.js');
const Utils = include('core/utils/utils.js');
const Db = include('core/system/db.js');

class Arikaim {

    constructor() {
        this.config = new Config();
        this.db = new Db();
        this.app = express();
        this.port = 8080;
        this.dev_mode = true;
        this.version = '1.0';
        this.self = this;
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
        console.log("Arikam Services version: " + this.version);
        this.config.load('config.json',(config) => {
            console.log(config);
            this.db.connect(config.db);
        });

       // console.log(Utils.createUUID() );

        this.app.listen(this.port,() => {
             console.log('Server started on port: ' + this.port);
        });
    }
}

module.exports = Arikaim;