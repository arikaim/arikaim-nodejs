#!/usr/bin/env node

'use strict';
/**
 * Arikaim
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import merge  from 'deepmerge' ;

import ArikaimServicesServer from './src/server.js';

const server = new ArikaimServicesServer();
// boot
await server.boot();
// run
server.run();
