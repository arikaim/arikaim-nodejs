'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import { readFileSync } from 'fs';

export default function loadPropertiesFile() {
    var fileName = (this.language != 'en') ? this.name + '-' + this.language : this.name;               
    try {
        var json = readFileSync(this.fullPath + fileName + '.json','utf8');  
        // merge data
        this.mergeContext(JSON.parse(json));  
    } catch (error) {
        writeLn(error);
    }
}
