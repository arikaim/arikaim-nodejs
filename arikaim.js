#!/usr/bin/env node

'use strict';
/**
 * Arikaim
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import ArikaimServicesServer from './src/server.js';
import cli from './src/cli/cli.js';

writeLn('\nArikaim (NodeJs)\n','blue');

cli.command('start')
    .description('Start server')
    .action(async (env, options) => {        
        const server = new ArikaimServicesServer();
        // boot
        await server.boot();
        // run
        server.run();
});

cli.parse();
