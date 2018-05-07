'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

const fs = require('fs');
const path = require('path');
const System = include('core/system/system.js');

class Services {

    constructor() {

    }

    install() {
        var files = fs.readdirSync(Services.getPath());
    }

    static getPath() {
        return System.getBasePath() + "services" + path.sep;
    }
}

module.exports = Services;