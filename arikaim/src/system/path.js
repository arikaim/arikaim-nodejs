'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

const path = require('path');

module.exports = class Path {

    static getRootPath() {
        return process.cwd();
    }

    static getArikaimPath() {
        return Path.getRootPath() +  path.sep + 'arikaim' + path.sep;
    }

    static getBasePath() {
        return Path.getRootPath() + path.sep + 'src' + path.sep;
    }

    static getConfigPath() {
        return Path.getArikaimPath() + 'config' + path.sep;
    }

    static getServicePath(serviceName) {
        var result = Path.getBasePath() + 'services' + path.sep;       
        if (isEmpty(serviceName) == false) {
            result += serviceName + path.sep;
        }

        return result;
    }
    
    static getModelsIncludePath(serviceName) {
        if (isEmpty(serviceName) == true) {
            return 'core' + path.sep + 'models' + path.sep;
        } 

        return  'services' + path.sep + serviceName + path.sep + 'models' + path.sep;
    }

    static getModelsPath(serviceName) {
        if (isEmpty(serviceName) == true) {
            return Path.getBasePath() + 'core' + path.sep + 'models' + path.sep;
        } 

        return  Path.getServicePath(serviceName) + 'models' + path.sep;
    }
}
