#!/usr/bin/env node
//#!/usr/bin/env node --debug-brk=5858

process.bin = process.title = 'dode-compose';

var path = require('path');
var program = require('commander');
var shell = require('shelljs');

var pkg = require('../package.json');

program
    .version(pkg.version)
    .usage('[env] [options] <COMMAND> [ARGS...] ');

program
    .command('init')
    .description('init docker-development-toolkit (dode)')
    .action(function () {
        var projectPkg = '';
        try {
            projectPkg = require(process.cwd() + '/package.json');
        } catch (error) {
            console.error('Error: package.json not found, use: npm init');
            process.exit(1);
        }

        shell.cp('-R', path.resolve(__dirname + '/../templates/*'), process.cwd());

        console.log('dode project "%s" created', projectPkg.name);
    });

// pass through to docker-compose
program
    .command('*')
    .description('docker-compose commands')
    .action(function () {
        var dode = require('../lib');

        var cmd = process.argv.slice(2)
        switch (cmd[0]) {
            case 'prod':
                cmd[0] = '-p ' + dode.name + ' -f docker-compose.yml';
                break
            case 'dev':
                cmd[0] = '-p ' + dode.name + '-dev -f docker-compose.yml -f docker-compose.dev.yml';
                break
        };
        cmd = 'docker-compose ' + cmd.join(' ');

        console.log('Exec: %s', cmd);
        shell.exec(cmd);
    });

program.on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dode-compose init      -> Create a dode project');
    console.log('');
    console.log('    $ dode-compose prod up   -> Create and start production containers');
    console.log('    $ dode-compose dev up    -> Create and start development containers');
    console.log('    $ dode-compose config    -> Validate and view the compose file');
    console.log('');
});



program.parse(process.argv);