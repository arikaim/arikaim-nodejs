'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import Path from '@arikaim/arikaim/common/path.js';

export default class Model {

    static async create(modelName, serviceName) {
       
        var modelFile;
        if (isEmpty(serviceName) == true) {
            modelFile = './models/' + modelName + '.js';
        } else {
            modelFile = Path.dbModel(serviceName,modelName);
        }

        var { default: modelClass } = await import(modelFile);

        return modelClass;      
    }
}
