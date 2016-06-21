'use strict';

var path = require('path');
var colour = require('colour')
var shell = require('shelljs');
var glob = require('glob');

// Constants
var envProd = 'prod';
var envDev = 'dev';

colour.mode = 'console';

function Dode(cwd) {
    var self = this;

    self.currentDir = process.cwd();

    self.dodeRoot = '';
    self.dodeJson = {};
    self.services = {};

    self._initDodeObject();
    self._initServiceObjects();

    var pkg = require(self.dodeRoot + '/package.json');
    self.name = pkg.name;
    self.version = pkg.version;

    // set env -> todo: wird das noch gebraucht ??
    shell.env['PROJECT_VERSION'] = self.version;
    shell.env['PROJECT_NAME'] = self.name;
    shell.env['DEV_PROJECT_NAME'] = self.name + 'dev';
};

Dode.prototype._initDodeObject = function () {
    var self = this;

    try {
        self.dodeRoot = self.currentDir;
        self.dodeJson = require(self.dodeRoot + '/dode.json');
    } catch (error) {
        try {
            self.dodeRoot = path.resolve(self.dodeRoot, '..')
            self.dodeJson = require(self.dodeRoot + '/dode.json');
        } catch (error) {
            console.error('Error: dode not properly configured, use: dode init');
        }
    };
};

Dode.prototype._initServiceObjects = function () {
    var self = this;
    var pkgs = glob.sync(self.dodeRoot + '/*/package.json');

    pkgs.forEach(function (pkgFile) {
        var dirname = (pkgFile.split('/').reverse()[1]).toUpperCase();
        self.services[dirname] = new Service(dirname, pkgFile);
    }, this);
};

function Service(service, pkgFile) {
    var self = this;
    var pkg = require(pkgFile);

    self.service = service;
    self.name = pkg.name;
    self.version = pkg.version;

    // set env
    shell.env[self.service + '_NAME'] = self.name;
    shell.env[self.service + '_VERSION'] = self.version;
};

module.exports = new Dode()