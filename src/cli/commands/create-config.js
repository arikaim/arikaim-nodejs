'use strict';
/**
 * Arikaim
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import Config from "@arikaim/arikaim/system/config.js";
import { Command } from 'commander';

export default new Command()
    .name('create-config-file')
    .description('Create default config file')
    .action((env,options) => {        
        writeLn('\Create default config file\n');
        Config.createConfigFile();
        writeLn('\nSuccessfully created\n','green');
    });
