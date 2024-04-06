'use strict';
/**
 * Arikaim services server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import Path from '@arikaim/arikaim/common/path.js';
import { File } from '@arikaim/arikaim/common/file.js';

export function loadConfig(fileName) {    
    fileName = Path.config() + getDefaultValue(fileName,'services-config.json');

    var data = File.readJSONFile(fileName);   
    if (data !== false) {
        return data;
    }

    return false;
}
