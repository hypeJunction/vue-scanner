# vue-scanner

`vue-scanner` is a cli command that allows you to scan project directories and generate `Vue.component()` definitions, as well as a list of components and their paths in JSON.

This has multiple use cases:

* Oftentimes your IDE is not able to resolve dynamic component definitions, i.e. if you are interpolating component names for dynamic require/import.
* You are doing something with vue-loader, e.g. parsing custom tags to generate docs, and want to have all your component definition within reach
* You are building a design system and tired of importing and declaring all of your dependencies in single-file components, and cleaning up all the redundant imports once templates change
  
## Getting started

Install:

```shell script
yarn add --dev @hypejunction/vue-scanner
```

Configure vue-scanner in `package.json`:

```json
{
  "vue-scanner": {
      "src": {
        "atoms": {
          "dirs": [
            "./src/components/atoms/"
          ],
          "async": false
        },
        "molecules": {
          "dirs": [
            "./src/components/molecules/"
          ],
          "async": true
        }
      },
      "target": {
        "js": "./src/components.js",
        "json": "./src/components.json"
      },
      "chunks": true,
      "chunkPrefix": "components/"
    }
}
```

Components are grouped into categories, i.e. "atoms" and "molecules", whereas each category may have multiple source directories. Group names can be used to define webpack chunks.
Each group can be async (in which case dynamic `import` with chunk name is used) or sync (in which case `require` statement is used);

The script will write two files: `js` and `json`. `js` file will contain `Vue.component()` declarations, whereas `json` file contains a list of all components with their names and paths.

Once the configuration is in place, simply run:

```shell script
yarn vue-scanner
``` 

You can integrate this script with your `nodemon` or `watch` commands.

## Sample output: JS

```js
import Vue from 'vue';

Vue.component('NBadge', require('./components/atoms/NBadge.vue').default);
Vue.component('NButton', require('./components/atoms/NButton.vue').default);
Vue.component('NControl', require('./components/atoms/NControl.vue').default);
Vue.component('NDiv', require('./components/atoms/NDiv.vue').default);
Vue.component('NField', require('./components/atoms/NField.vue').default);
Vue.component('NForm', require('./components/atoms/NForm.vue').default);
Vue.component('NHighlight', require('./components/atoms/NHighlight.vue').default);
Vue.component('NIcon', require('./components/atoms/NIcon.vue').default);
Vue.component('NImg', require('./components/atoms/NImg.vue').default);
Vue.component('NLayer', require('./components/atoms/NLayer.vue').default);
Vue.component('NMedia', require('./components/atoms/NMedia.vue').default);
Vue.component('NMessage', require('./components/atoms/NMessage.vue').default);
Vue.component('NTag', require('./components/atoms/NTag.vue').default);
Vue.component('NText', require('./components/atoms/NText.vue').default);
Vue.component('NCheckbox', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NCheckbox.vue'));
Vue.component('NCheckboxGroup', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NCheckboxGroup.vue'));
Vue.component('NDialog', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NDialog.vue'));
Vue.component('NDropzone', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NDropzone.vue'));
Vue.component('NEmbed', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NEmbed.vue'));
Vue.component('NList', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NList.vue'));
Vue.component('NMenuItem', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NMenuItem.vue'));
Vue.component('NPagination', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NPagination.vue'));
Vue.component('NPopup', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NPopup.vue'));
Vue.component('NRadio', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NRadio.vue'));
Vue.component('NRadioGroup', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NRadioGroup.vue'));
Vue.component('NSelect', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NSelect.vue'));
Vue.component('NTextField', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NTextField.vue'));
Vue.component('NTile', () => import(/* webpackChunkName: components/molecules */ './components/molecules/NTile.vue'));
```

## Sample Output: JSON

```json
[
    {
        "name": "NBadge",
        "path": "/opt/projects/vue-starter/src/components/atoms/NBadge.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NBadge.vue"
    },
    {
        "name": "NButton",
        "path": "/opt/projects/vue-starter/src/components/atoms/NButton.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NButton.vue"
    },
    {
        "name": "NControl",
        "path": "/opt/projects/vue-starter/src/components/atoms/NControl.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NControl.vue"
    },
    {
        "name": "NDiv",
        "path": "/opt/projects/vue-starter/src/components/atoms/NDiv.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NDiv.vue"
    },
    {
        "name": "NField",
        "path": "/opt/projects/vue-starter/src/components/atoms/NField.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NField.vue"
    },
    {
        "name": "NForm",
        "path": "/opt/projects/vue-starter/src/components/atoms/NForm.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NForm.vue"
    },
    {
        "name": "NHighlight",
        "path": "/opt/projects/vue-starter/src/components/atoms/NHighlight.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NHighlight.vue"
    },
    {
        "name": "NIcon",
        "path": "/opt/projects/vue-starter/src/components/atoms/NIcon.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NIcon.vue"
    },
    {
        "name": "NImg",
        "path": "/opt/projects/vue-starter/src/components/atoms/NImg.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NImg.vue"
    },
    {
        "name": "NLayer",
        "path": "/opt/projects/vue-starter/src/components/atoms/NLayer.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NLayer.vue"
    },
    {
        "name": "NMedia",
        "path": "/opt/projects/vue-starter/src/components/atoms/NMedia.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NMedia.vue"
    },
    {
        "name": "NMessage",
        "path": "/opt/projects/vue-starter/src/components/atoms/NMessage.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NMessage.vue"
    },
    {
        "name": "NTag",
        "path": "/opt/projects/vue-starter/src/components/atoms/NTag.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NTag.vue"
    },
    {
        "name": "NText",
        "path": "/opt/projects/vue-starter/src/components/atoms/NText.vue",
        "group": "atoms",
        "async": false,
        "relativePath": "./components/atoms/NText.vue"
    },
    {
        "name": "NCheckbox",
        "path": "/opt/projects/vue-starter/src/components/molecules/NCheckbox.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NCheckbox.vue"
    },
    {
        "name": "NCheckboxGroup",
        "path": "/opt/projects/vue-starter/src/components/molecules/NCheckboxGroup.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NCheckboxGroup.vue"
    },
    {
        "name": "NDialog",
        "path": "/opt/projects/vue-starter/src/components/molecules/NDialog.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NDialog.vue"
    },
    {
        "name": "NDropzone",
        "path": "/opt/projects/vue-starter/src/components/molecules/NDropzone.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NDropzone.vue"
    },
    {
        "name": "NEmbed",
        "path": "/opt/projects/vue-starter/src/components/molecules/NEmbed.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NEmbed.vue"
    },
    {
        "name": "NList",
        "path": "/opt/projects/vue-starter/src/components/molecules/NList.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NList.vue"
    },
    {
        "name": "NMenuItem",
        "path": "/opt/projects/vue-starter/src/components/molecules/NMenuItem.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NMenuItem.vue"
    },
    {
        "name": "NPagination",
        "path": "/opt/projects/vue-starter/src/components/molecules/NPagination.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NPagination.vue"
    },
    {
        "name": "NPopup",
        "path": "/opt/projects/vue-starter/src/components/molecules/NPopup.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NPopup.vue"
    },
    {
        "name": "NRadio",
        "path": "/opt/projects/vue-starter/src/components/molecules/NRadio.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NRadio.vue"
    },
    {
        "name": "NRadioGroup",
        "path": "/opt/projects/vue-starter/src/components/molecules/NRadioGroup.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NRadioGroup.vue"
    },
    {
        "name": "NSelect",
        "path": "/opt/projects/vue-starter/src/components/molecules/NSelect.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NSelect.vue"
    },
    {
        "name": "NTextField",
        "path": "/opt/projects/vue-starter/src/components/molecules/NTextField.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NTextField.vue"
    },
    {
        "name": "NTile",
        "path": "/opt/projects/vue-starter/src/components/molecules/NTile.vue",
        "group": "molecules",
        "async": true,
        "relativePath": "./components/molecules/NTile.vue"
    }
]
```
