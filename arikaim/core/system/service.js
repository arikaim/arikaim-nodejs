'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

class Service {

    constructor(name) {
        this.name = name;
    }

    install() {
        throw('Override install method');
    }

    addRoute(method,path,handler_class,handler_method) {

    }


}

module.exports = Service;