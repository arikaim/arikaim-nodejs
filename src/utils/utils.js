'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
 * 
*/

import { readFileSync } from 'fs';
import { default as PHPUnserialize } from 'php-unserialize';

export default class Utils {

    static async readPHPSession(id, storageFolder) {
        var fileName = storageFolder + '/sess_' + id;
        try {
            var data = await readFileSync(fileName,'utf8');
        } catch (error) {
            return false;
        }
        
        return PHPUnserialize.unserializeSession(data);
    }
}
