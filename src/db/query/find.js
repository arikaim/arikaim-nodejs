'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

export default function findById(id, scope, raw) {
    const model = (isEmpty(scope) == true) ? this : this.scope(scope);
   
    return model.findOne({
        where: {
            id: id
        },
        raw: raw ?? true
    });
};
