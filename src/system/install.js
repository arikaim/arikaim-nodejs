'use strict';
/**
 * Arikaim
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import Path from './system/path.js';

export default class Path {

    static createProjectFolders() {
        writeLn('Create project folders...');
        var path = Path.getArikaimPath();
        console.log(path);
    }
}