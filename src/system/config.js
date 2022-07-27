'use strict';
/**
 * Arikaim services server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import Path from './path.js';

export default class Config {

    static async loadConfig(fileName) {
        fileName = getDefaultValue(fileName,'services-config.json');
        fileName = Path.getConfigPath() + fileName;
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
}
