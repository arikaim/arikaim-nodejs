'use strict';
/**
 * Arikaim
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import path from 'path';
import { readdirSync, statSync } from 'fs';

export default class Path {

    static get sep() {
        return path.sep;
    }

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

    static get viewPath() {
        return Path.getArikaimPath() + 'view' + path.sep; 
    }

    static get templatesPath() {
        return Path.viewPath + 'templates' + path.sep + 'nodejs' + path.sep; 
    }

    static templatePath(name) {
        return Path.templatesPath + name + path.sep;
    }

    static get componentsPath() {
        return Path.viewPath + 'components' + path.sep; 
    }

    static getServicesPath(serviceName) {
        var result = Path.getArikaimPath() + 'services' + path.sep;       
        if (isEmpty(serviceName) == false) {
            result += serviceName + path.sep;
        }

        return result;
    }
    
    static getDbModelsPath(serviceName, modelName) {
        var modelPath = Path.getServicesPath(serviceName) + 'models' + path.sep;

        return (isEmpty(modelPath) == true) ? modelPath : modelPath + modelName + '.js';
    }

    static getJobsPath(serviceName, jobFile) {
        if (isEmpty(jobFile) == true) {
            return null;
        }
        var jobsPath = Path.getServicesPath(serviceName) + 'jobs' + path.sep;

        return (isEmpty(jobsPath) == false) ? jobsPath + jobFile + '.js' : null;
    }
}
