#!/usr/bin/env node

'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { Command } from 'commander';
import ArikaimServicesServer from './src/server.js';

const arikaimCli = new Command();

arikaimCli
    .version('1.0.0')
  //  .option('-help','Show help')
    .description('Arikaim Srvices Server');

arikaimCli.command('help')
    .description('Arikaim Service Server help')
    .action((env, options) => {        
        console.log('\nArikaim Services Server help\n');
        console.log('Show help');
});


const server = new ArikaimServicesServer();

server.loadConfig();
server.boot();
server.run();