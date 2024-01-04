#!/usr/bin/env node

'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { Command } from 'commander';
import { default as Config } from './src/system/config.js';
import ArikaimServicesServer from './src/server.js';


const arikaimCli = new Command();

writeLn('\nArikaim Srvices Server (NodeJs)\n','blue');

arikaimCli
    .version('1.0.0')
    .option('-help','Show help')
    .description('');

arikaimCli.command('help')
    .description('Help')
    .action((env, options) => {        
        writeLn('\nHelp\n');
});

arikaimCli.command('start')
    .description('Start server')
    .action(async (env, options) => {        
        const server = new ArikaimServicesServer();
        // boot
        await server.boot();
        // run
        server.run();
});

arikaimCli.command('create-config-file')
    .description('Create default config file')
    .action((env, options) => {        
        writeLn('\Create default config file\n');
        Config.createConfigFile();
        writeLn('\nSuccessfully created\n','green');      
});

arikaimCli.parse();
