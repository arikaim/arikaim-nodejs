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
        if (isEmpty(serviceName) == true) {
            var modelFile = './models/' + modelName + '.js';
        } else {
            var modelFile = Path.dbModel(serviceName,modelName);
        }

        return Model.createFromFile(modelFile);  
    }

    static async createFromFile(modelFile) {
        const { default: model } = await import(modelFile);

        return await model; 
    }
}
