'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import chalk from 'chalk';
import Path from './path.js';
import { createRequire } from "module";

global.require = createRequire(import.meta.url);

global.message = function(message,color) {
    message = (color) ? chalk.keyword(color)(message) : message;
    console.log(message);
}

global.writeLn = function(message,color) {
    message = (color) ? chalk.keyword(color)(message) : message;
    process.stdout.write(message + "\n"); 
}

global.errorMessage = function(message) {
    global.message(message,'red');
}

global.include = function(name) {
    return require(Path.getBasePath() + name);
}

global.isFunction = function(variable) {
    return (typeof variable === 'function');
}

global.callFunction = function(functionName,params) {
    if (isFunction(functionName) == true) {
        return functionName(params);
    }
    return null;
}

global.isJSON = function(json) {
    try {
        var json = JSON.stringify(json);
        var json = JSON.parse(json);
        if (typeof(json) == 'string') {
            if (json.length == 0) return false;
        }
    }
    catch (e) {
        return false;
    }

    return true;
}

global.getObjectProperty = function(path, obj) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}

global.getValue = function(path,obj,defaultValue) {
    var val = getObjectProperty(path,obj);
    return (val == null) ? defaultValue : val;      
}

global.getDefaultValue = function(variable, defaultValue) {
    return (isEmpty(variable) == true) ? defaultValue : variable;      
}

global.isEmpty = function(variable) {
    if (variable === undefined) return true;
    if (variable === null) return true;
    if (variable === "") return true;

    return false;
}

global.isObject = function(variable) {
    return (typeof variable === 'object') && (variable != null);
}

global.isArray = function(variable) {
    return (isEmpty(variable) == true) ? false : (variable.constructor === Array);   
}

global.applyTrait = function(targetClass, trait, methodName) {

    if (isObject(trait) == true) {
        Object.keys(trait).forEach(function(name) {
            targetClass.prototype[name] = trait[name];
        });
    }
    
    if (isFunction(trait) == true) {
        targetClass.prototype[methodName] = trait;
    }

}
