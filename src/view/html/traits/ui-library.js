'use strict';
/**
 * Arikaim server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import ArikaimPackage from '@arikaim/arikaim/common/package.js';
import Path from '@arikaim/arikaim/common/path.js';

export function resolveLibraryFiles(libraryName) {   
    const tokens = libraryName.split(':');
    const name = tokens[0];
    const version = tokens[1];
  
    var descriptor = ArikaimPackage.loadPackageDescriptor(name,'library');
    if (isObject(descriptor) == false) {
        return false;
    }

    var files = (isEmpty(version) == true) ? descriptor['files'] : descriptor['files'][version];
    if (isEmpty(files) == true) {
        return [];
    }
    var path = Path.library(name,true);

    files.forEach((file, index, files) => {
        files[index] = path + file;
    });

    return files;
}
