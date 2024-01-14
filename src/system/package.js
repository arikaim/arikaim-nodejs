'use strict';
/**
 * Arikaim 
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { readFileSync } from 'fs';
import Path from '@arikaim/arikaim/system/path.js';

export default class ArikaimPackage {
  
    static loadPackageDescriptor(name,packageType) {
        var path;
        packageType = (isEmpty(packageType) == true) ? 'template' : packageType;

        switch (packageType) {
            case 'template':
                path = Path.templatePath(name);
                break;
            case 'service':
                path = Path.getServicesPath(name);
                break;           
        }

        try {
            var json = readFileSync(path + 'arikaim-package.json','utf8');  
            // merge data
            return JSON.parse(json);  
        } catch (error) {
            writeLn(error);

            return null;
        }
    }
}
