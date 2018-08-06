(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'babel-runtime/core-js/json/stringify', 'babel-runtime/helpers/extends', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'path', 'fs', './lib'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/json/stringify'), require('babel-runtime/helpers/extends'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('path'), require('fs'), require('./lib'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.stringify, global._extends, global.classCallCheck, global.createClass, global.path, global.fs, global.lib);
        global.index = mod.exports;
    }
})(this, function (exports, _stringify, _extends2, _classCallCheck2, _createClass2, _path, _fs, _lib) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _stringify2 = _interopRequireDefault(_stringify);

    var _extends3 = _interopRequireDefault(_extends2);

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _path2 = _interopRequireDefault(_path);

    var _fs2 = _interopRequireDefault(_fs);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var stream = _fs2.default.createWriteStream(_path2.default.join(__dirname, '../log.txt'), {
        encoding: 'utf8'
    });

    var Helper = function () {
        function Helper() {
            (0, _classCallCheck3.default)(this, Helper);
        }

        (0, _createClass3.default)(Helper, null, [{
            key: 'parseWxml',
            value: function parseWxml(file, code) {
                var baseInfo = {
                    dirname: _path2.default.dirname(file),
                    filename: _path2.default.basename(file)
                };
                try {
                    return (0, _extends3.default)({}, baseInfo, {
                        obj: (0, _lib.wxml2json)(code),
                        error: null
                    });
                } catch (error) {
                    return (0, _extends3.default)({}, baseInfo, {
                        obj: null,
                        error: {
                            message: error.message,
                            stack: error.stack
                        }
                    });
                }
            }
        }, {
            key: 'toWxml',
            value: function toWxml(code) {
                try {
                    return (0, _lib.json2wxml)(code);
                } catch (error) {
                    return '';
                }
            }
        }]);
        return Helper;
    }();

    var _class = function () {
        function _class(cfg) {
            (0, _classCallCheck3.default)(this, _class);

            this.cfg = (0, _extends3.default)({}, cfg);
        }

        (0, _createClass3.default)(_class, [{
            key: 'apply',
            value: function apply(op) {
                var code = op.code,
                    file = op.file;

                if (/\.wxml$/.test(file)) {
                    stream.write('====================================\n');
                    stream.write((0, _stringify2.default)(Helper.parseWxml(file, code), '\n', 2));
                    stream.write('\n');
                    stream.write('====================================\n\n\n');
                }

                // stream.write(file);
                // stream.write(/\.wxml$/.test(file));

                // if (/\.wxml$/.test(file)) {

                // } else {

                // }

                op.next();
            }
        }]);
        return _class;
    }();

    exports.default = _class;
});