#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { writeSpecFiles } from './index';

const projectConfig = require(path.join(process.cwd(), './package.json'));
const scannerConfig = projectConfig['vue-scanner'];

if (typeof scannerConfig === 'undefined') {
    throw new Error('Please define "vue-scanner" options in your package.json');
}

if (typeof scannerConfig.src === 'undefined') {
    throw new Error('Please provide a list of src directories to scan via "vue-scanner.src" in your package.json');
}

if (typeof scannerConfig.target === 'undefined') {
    throw new Error('Please provide a filename of the target file to write component definitions to via package.json');
}

writeSpecFiles(scannerConfig);
