'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arikaim Services*
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
var express = require("express");
//const io = require('socket.io')(server);
//const Config = require('./system/config.js')
//const Path = require('./system/path.js')
//const container = require('./system/container.js');
//const Db = require('./db/db.js');
var Arikaim = /** @class */ (function () {
    function Arikaim() {
        this.express = express();
        //this.config = new Config();
        this.version = '1.0.0';
        this.port = 8080;
    }
    Arikaim.prototype.getConfig = function () {
        return this.config;
    };
    Arikaim.prototype.setPort = function (port) {
        this.port = port;
    };
    Arikaim.prototype.init = function () {
        console.log('');
        console.log('Arikam CMS Services', 'cyan');
        console.log('version: ' + this.version);
        console.log('');
        return new Promise(function (resolve, reject) {
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
    };
    Arikaim.prototype.run = function () {
        var _this = this;
        this.init().then(function (result) {
            _this.start();
        }).catch(function (error) {
            console.log('Error start server');
            _this.exit();
        });
    };
    Arikaim.prototype.start = function () {
        console.log('Database connection.');
        /*
        this.db.connect(this.config.getDatabaseConfig()).then(() => {
            this.startHttpServer()
        }).catch((err) => {
            errorMessage(err);
        });
        */
    };
    Arikaim.prototype.startHttpServer = function () {
        var _this = this;
        this.express.listen(this.port, function () {
            console.log('Http server started on port: ' + _this.port);
        });
    };
    Arikaim.prototype.isInstalled = function () {
        return true;
    };
    Arikaim.prototype.exit = function () {
        process.exit(0);
    };
    return Arikaim;
}());
