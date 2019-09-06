"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeSpecFiles = exports.writeJsonSpecFile = exports.writeJsSpecFile = exports.listComponents = exports.scanDirectory = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var scanDirectory = function scanDirectory(dirPath) {
  var extensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['vue'];
  var regex = new RegExp("\\.".concat(extensions.join('|'), "$"));
  return _fs["default"].readdirSync(dirPath).filter(function (e) {
    return e.match(regex);
  }).map(function (e) {
    return {
      name: e.replace(regex, ''),
      path: "".concat(dirPath).concat(e)
    };
  });
};

exports.scanDirectory = scanDirectory;

var listComponents = function listComponents() {
  var groups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var components = [];
  Object.keys(groups).forEach(function (groupName) {
    var _groups$groupName = groups[groupName],
        dirs = _groups$groupName.dirs,
        _groups$groupName$asy = _groups$groupName.async,
        async = _groups$groupName$asy === void 0 ? true : _groups$groupName$asy;
    dirs.forEach(function (directory) {
      var dirPath = _path["default"].join(process.cwd(), directory);

      var componentFiles = scanDirectory(dirPath);
      components.push.apply(components, _toConsumableArray(componentFiles.map(function (componentFile) {
        return _objectSpread({}, componentFile, {
          group: groupName,
          async: async
        });
      })));
    });
  });
  return components;
};

exports.listComponents = listComponents;

var writeJsSpecFile = function writeJsSpecFile(_ref) {
  var components = _ref.components,
      outputFile = _ref.outputFile,
      chunks = _ref.chunks,
      chunkPrefix = _ref.chunkPrefix;

  var target = _path["default"].join(process.cwd(), outputFile);

  if (!_fs["default"].existsSync(target)) {
    _fs["default"].closeSync(_fs["default"].openSync(target, 'w', '0666'));
  }

  var lines = [];
  lines.push("import Vue from 'vue';", "");
  components.forEach(function (component) {
    var componentPath = './' + _path["default"].relative(_path["default"].dirname(target), component.path).replace(/\\/ig, '/');

    if (component.async) {
      var chunkAnnotation = chunks ? "/* webpackChunkName: ".concat(chunkPrefix).concat(component.group, " */ ") : '';
      lines.push("Vue.component('".concat(component.name, "', () => import(").concat(chunkAnnotation, "'").concat(componentPath, "'));"));
    } else {
      lines.push("Vue.component('".concat(component.name, "', require('").concat(componentPath, "').default);"));
    }
  });
  lines.push('');
  var buffer = Buffer.from(lines.join('\n'));

  _fs["default"].writeFileSync(target, buffer);
};

exports.writeJsSpecFile = writeJsSpecFile;

var writeJsonSpecFile = function writeJsonSpecFile(_ref2) {
  var components = _ref2.components,
      outputFile = _ref2.outputFile;

  var target = _path["default"].join(process.cwd(), outputFile);

  if (!_fs["default"].existsSync(target)) {
    _fs["default"].closeSync(_fs["default"].openSync(target, 'w', '0666'));
  }

  var spec = components.map(function (component) {
    component.path = component.path.replace(/\\/ig, '/');
    component.relativePath = './' + _path["default"].relative(_path["default"].dirname(target), component.path).replace(/\\/ig, '/');
    return component;
  });
  var buffer = Buffer.from(JSON.stringify(spec, null, 4));

  _fs["default"].writeFileSync(target, buffer);
};

exports.writeJsonSpecFile = writeJsonSpecFile;

var writeSpecFiles = function writeSpecFiles(options) {
  var _options$src = options.src,
      src = _options$src === void 0 ? {} : _options$src,
      _options$target = options.target,
      target = _options$target === void 0 ? {} : _options$target,
      _options$chunks = options.chunks,
      chunks = _options$chunks === void 0 ? false : _options$chunks,
      _options$chunkPrefix = options.chunkPrefix,
      chunkPrefix = _options$chunkPrefix === void 0 ? '' : _options$chunkPrefix;
  var components = listComponents(src);

  if (target.js) {
    writeJsSpecFile({
      components: components,
      outputFile: target.js,
      chunks: chunks,
      chunkPrefix: chunkPrefix
    });
  }

  if (target.json) {
    writeJsonSpecFile({
      components: components,
      outputFile: target.json
    });
  }
};

exports.writeSpecFiles = writeSpecFiles;