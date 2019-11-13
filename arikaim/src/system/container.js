'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

const awilix  = require('awilix');

//const Path = require('./path.js');
const Config = require('./config.js');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC
});

container.register({     
    Config: awilix.asClass(Config)  
});

module.exports = container;