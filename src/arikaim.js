#!/usr/bin/env node

'use strict';
/**
 * Arikaim
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import ArikaimServicesServer from '@arikaim/arikaim-server/server.js';

const server = new ArikaimServicesServer();
// boot
await server.boot();
// run
server.run();
