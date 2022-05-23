'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import Path from './../system/path.js';

export default class Model {

    static async create(modelName, serviceName) {
        if (isEmpty(serviceName) == true) {
            var modelFile = './models/' + modelName + '.js';
        }
        var { default: modelClass } = await import(modelFile);

        return modelClass;
    }
}
