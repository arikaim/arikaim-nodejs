'use strict';
/**
 * Arikaim
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { Command } from 'commander';
import { default as configCommand } from "@arikaim/arikaim/cli/commands/create-config.js";

const cli = new Command();

cli.version('1.0.0')
    .option('-help','Show help')
    .description('');

cli.command('help')
    .description('Help')
    .action((env, options) => {        
        writeLn('\nHelp\n');
});


cli.addCommand(configCommand);


export default cli;
    