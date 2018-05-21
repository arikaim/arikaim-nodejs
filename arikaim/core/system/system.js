'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

const path = require('path');

class System {

    static log(msg) {
        console.log(msg);
    }
    
    static message(msg) {
        console.log(msg);
    }

    static getRootPath() {
        return process.cwd();
    }

    static getBasePath() {
        return System.getRootPath() + path.sep + 'arikaim' + path.sep;
    }

    static getConfigPath() {
        return System.getBasePath() + 'config'  + path.sep;
    }

    static getServicePath(service_name) {
        var path = System.getBasePath() + "services" + path.sep;
        if (isEmpty(service_name) == false) {
            path = path + service_name + path.sep;
        }
        return path;
    }
    
    static getModelsPath(service_name) {
        if (isEmpty(service_name) == true) {
            return 
        }
        return System.getServicePath(service_name) + "models" + path.sep;
    }

    static include(name) {
        return require(System.getBasePath() + name);
    }
    
}

global.include = function(name) {
    return System.include(name);
}

global.isFunction = function(variable) {
    if (typeof variable === 'function') return true;    
    return false;
}

global.callFunction = function(function_name,params) {
    if (isFunction(function_name) == true) {
        return function_name(params);
    }
    return null;
}

global.isJSON = function(json_string) {
    try {
        var json_string = JSON.stringify(json_string);
        var json = JSON.parse(json_string);
        if(typeof(json_string) == 'string')
            if(json_string.length == 0) return false;
    }
    catch(e){
        return false;
    }
    return true;
}

global.getObjectProperty = function(path, obj) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}

global.getValue = function(path,obj,default_value) {
    var val = getObjectProperty(path,obj);
    if (val == null) {
        val = default_value;
    }
    return val;
}

global.getDefaultValue = function(variable,default_value) {
    if (isEmpty(variable) == true) {
        return default_value;
    }
    return variable;
}

global.isEmpty = function(variable) {
    if (variable === undefined) return true;
    if (variable === null) return true;
    if (variable === "") return true;
    return false;
}

global.isObject = function(variable) {
    return (typeof variable === 'object');
}

global.isArray = function(variable) {
    if (isEmpty(variable) == true) return false;
    return (variable.constructor === Array);
}

module.exports = System;