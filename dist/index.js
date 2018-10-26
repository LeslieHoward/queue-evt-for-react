(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReactEvt"] = factory();
	else
		root["ReactEvt"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.emit = exports.connect = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = __webpack_require__(3);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _queueEvt = __webpack_require__(4);

var _utils = __webpack_require__(5);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var signal = new _queueEvt.Signal();

var connect = function connect(idSet) {
  return function (SourceComponent) {
    var TargetComponent = function (_Component) {
      _inherits(TargetComponent, _Component);

      function TargetComponent(props) {
        _classCallCheck(this, TargetComponent);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.sourceRef = _this.props.forwardRef || _react2.default.createRef();
        return _this;
      }

      TargetComponent.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (_utils2.default.notNull(this.sourceRef.current) && _utils2.default.isArray(idSet)) {
          idSet.forEach(function (item) {
            var action = item.action,
                handler = item.handler;

            item.token = _utils2.default.uuid();
            if (typeof handler === 'function') {
              signal.on(action, handler.bind(_this2.sourceRef.current), { token: item.token });
            }
          });
        }
      };

      TargetComponent.prototype.componentWillUnmount = function componentWillUnmount() {
        if (_utils2.default.isArray(idSet)) {
          idSet.forEach(function (item) {
            var action = item.action,
                token = item.token;

            signal.remove(action, token);
          });
        }
      };

      TargetComponent.prototype.render = function render() {
        var _props = this.props,
            forwardRef = _props.forwardRef,
            restProps = _objectWithoutProperties(_props, ['forwardRef']);

        return _react2.default.createElement(SourceComponent, _extends({}, restProps, { ref: this.sourceRef }));
      };

      return TargetComponent;
    }(_react.Component);

    var InheritTargetComponent = (0, _hoistNonReactStatics2.default)(TargetComponent, SourceComponent);
    return _react2.default.forwardRef(function (props, ref) {
      return _react2.default.createElement(InheritTargetComponent, _extends({}, props, { forwardRef: ref }));
    });
  };
};

var emit = signal.emit;

exports.connect = connect;
exports.emit = emit;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("hoist-non-react-statics");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("queue-evt");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var utils = {
  type: function type(o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
  },

  isNull: function isNull(o) {
    var item = void 0;
    for (item in o) {
      return false;
    }
    return true;
  },

  notNull: function notNull(o) {
    return !utils.isNull(o);
  },

  isArray: function isArray(o) {
    return utils.type(o) === 'array';
  },

  isFunction: function isFunction(o) {
    return utils.type(o) === 'function';
  },

  uuid: function uuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  }
};

exports.default = utils;

/***/ })
/******/ ]);
});