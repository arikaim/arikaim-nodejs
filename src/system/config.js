'use strict';
/**
 * Arikaim services server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { readFileSync, existsSync, writeFileSync } from 'fs';
import Path from './path.js';

export default class Config {

    static getConfigPath(fileName) {
        fileName = getDefaultValue(fileName,'services-config.json');
        return Path.getConfigPath() + fileName;
    }

    static async loadConfig(fileName) {     
        fileName = Config.getConfigPath(fileName);

        if (existsSync(fileName) == false) {
            console.error('Config file not exists: ' + fileName);
            return false;
        }

        var data = readFileSync(fileName,'utf8');   

        if (isJSON(data) == true) {
            var config = JSON.parse(data);
            message('Config file: ' + fileName + ' loaded ','green');
            return config;
        }
        
        errorMessage('Error loading config file: ' + fileName);
        return false;
    }

    static async createConfigFile(fileName) {
        fileName = Config.getConfigPath(fileName);
        if (existsSync(fileName) == true) {
            console.error('Config file exists: \n' + fileName);
            return false;
        }
        
        const config = {
            port: 3000,
            host: "127.0.0.1",
            cors: {
                "origin": "http://localhost",
                "credentials": true
            },
            database: {
                type: "mysql",
                host : "127.0.0.1",
                username : "db user name here",
                password : "db password here",
                database : "db name",
                dialect: "mysql",
                synchronize: true,
                logging: false
            }, 
            socket: {
                cookie: true,
                withCredentials: true,
                cors: {
                    origin: "localhost",
                    allowedHeaders: ["token","tokenType"],
                    methods: ["GET","POST","PUT"],
                    credentials: true
                }
            },
            php: {
                session_storage: ""
            }
        }

        try {
            
            writeFileSync(fileName,JSON.stringify(config,null,2),'utf8');
            return existsSync(fileName);

          } catch (error) {
            console.error('An error has occurred creating config file',error);
          }
    }
}
