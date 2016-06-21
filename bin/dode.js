#!/usr/bin/env node
//#!/usr/bin/env node --debug-brk=5858

process.bin = process.title = 'dode';

var program = require('commander');
var shell = require('shelljs');

var pkg = require('../package.json');
var dode = require('../lib');

program
    .version(pkg.version)
    .usage('[env] [options] <COMMAND> [ARGS...] ');

// pass through to docker
program
    .command('*')
    .description('docker commands')
    .action(function () {
        var cmd = process.argv.slice(2)
        cmd = 'docker ' + cmd.join(' ');

        console.log();
        console.log('exec: %s', cmd);
        console.log();

        shell.exec(cmd);
    });

program.parse(process.argv);