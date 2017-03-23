#!/usr/bin/env node

import program from 'commander';
import genDiff from '../';

program
    .version('0.9.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format (sjson(default), plain)')
    .arguments('<first_config> <second_config>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig, program.format));
    })
    .parse(process.argv);
