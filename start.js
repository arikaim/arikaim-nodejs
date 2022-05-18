'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2021-2022 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license 
*/

import  { default as ArikaimServicesServer }  from "@arikaim/arikaim-services/src/server.js"

const server = new ArikaimServicesServer();

server.loadConfig();
server.boot();
server.run();
