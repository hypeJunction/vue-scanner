#!/usr/bin/env node
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var projectConfig = require(_path["default"].join(process.cwd(), './package.json'));

var scannerConfig = projectConfig['vue-scanner'];

if (typeof scannerConfig === 'undefined') {
  throw new Error('Please define "vue-scanner" options in your package.json');
}

if (typeof scannerConfig.src === 'undefined') {
  throw new Error('Please provide a list of src directories to scan via "vue-scanner.src" in your package.json');
}

if (typeof scannerConfig.target === 'undefined') {
  throw new Error('Please provide a filename of the target file to write component definitions to via package.json');
}

(0, _index.writeSpecFiles)(scannerConfig);