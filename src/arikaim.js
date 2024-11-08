#!/usr/bin/env node
'use strict';
/**
 * Arikaim
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { arikaimServer } from '@arikaim/server/server.js';

// boot
await arikaimServer.boot();
// run
arikaimServer.run();
