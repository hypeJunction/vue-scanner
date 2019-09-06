import fs from 'fs';
import path from 'path';

export const scanDirectory = (dirPath, extensions = ['vue']) => {
    const regex = new RegExp(`\\.${extensions.join('|')}$`);

    return fs.readdirSync(dirPath)
        .filter((e) => e.match(regex))
        .map((e) => {
            return {
                name: e.replace(regex, ''),
                path: `${dirPath}${e}`,
            };
        });
};

export const listComponents = (groups = {}) => {
    const components = [];

    Object.keys(groups).forEach((groupName) => {
        const { dirs, async = true } = groups[groupName];

        dirs.forEach((directory) => {
            const dirPath = path.join(process.cwd(), directory);
            const componentFiles = scanDirectory(dirPath);

            components.push(...componentFiles.map((componentFile) => {
                return {
                    ...componentFile,
                    group: groupName,
                    async,
                };
            }));
        });
    });

    return components;
};

export const writeJsSpecFile = ({ components, outputFile, chunks, chunkPrefix, requestChunks }) => {
    const target = path.join(process.cwd(), outputFile);

    if (!fs.existsSync(target)) {
        fs.closeSync(fs.openSync(target, 'w', '0666'));
    }

    const lines = [];

    lines.push(
        `import Vue from 'vue';`,
        ``,
    );

    components.forEach((component) => {
        const componentPath = './' + path.relative(path.dirname(target), component.path).replace(/\\/ig, '/');

        if (component.async) {
            const chunkName = requestChunks ? `${chunkPrefix}${component.group}/${component.name}` : `${chunkPrefix}${component.group}`;
            const chunkAnnotation = chunks ? `/* webpackChunkName: "${chunkName}" */ ` : '';

            lines.push(`Vue.component('${component.name}', () => import(${chunkAnnotation}'${componentPath}'));`);
        } else {
            lines.push(`Vue.component('${component.name}', require('${componentPath}').default);`);
        }
    });

    lines.push('');

    const buffer = Buffer.from(lines.join('\n'));

    fs.writeFileSync(target, buffer);
};

export const writeJsonSpecFile = ({ components, outputFile }) => {
    const target = path.join(process.cwd(), outputFile);

    if (!fs.existsSync(target)) {
        fs.closeSync(fs.openSync(target, 'w', '0666'));
    }

    const spec = components.map((component) => {
        component.path = component.path.replace(/\\/ig, '/');
        component.relativePath = './' + path.relative(path.dirname(target), component.path).replace(/\\/ig, '/');

        return component;
    });

    const buffer = Buffer.from(JSON.stringify(spec, null, 4));

    fs.writeFileSync(target, buffer);
};

export const writeSpecFiles = (options) => {
    const {
        src = {},
        target = {},
        chunks = false,
        requestChunks = false,
        chunkPrefix = '',
    } = options;

    const components = listComponents(src);

    if (target.js) {
        writeJsSpecFile({
            components,
            outputFile: target.js,
            chunks,
            chunkPrefix,
            requestChunks,
        });
    }

    if (target.json) {
        writeJsonSpecFile({
            components,
            outputFile: target.json,
        });
    }
};
