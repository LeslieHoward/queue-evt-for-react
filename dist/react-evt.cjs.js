'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'));
var queueEvt = require('queue-evt');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var utils = {
  type: function type(o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
  },
  isNull: function isNull(o) {
    var item;

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

var signal = new queueEvt.Signal();

var connect = function connect(idSet) {
  return function (SourceComponent) {
    var TargetComponent = /*#__PURE__*/function (_Component) {
      _inherits(TargetComponent, _Component);

      var _super = _createSuper(TargetComponent);

      function TargetComponent(props) {
        var _this;

        _classCallCheck(this, TargetComponent);

        _this = _super.call(this, props);
        _this.sourceRef = _this.props.forwardRef || /*#__PURE__*/React__default.createRef();
        return _this;
      }

      _createClass(TargetComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;

          if (utils.notNull(this.sourceRef.current) && utils.isArray(idSet)) {
            idSet.forEach(function (item) {
              var action = item.action,
                  handler = item.handler;
              item.token = utils.uuid();

              if (typeof handler === "function") {
                signal.on(action, handler.bind(_this2.sourceRef.current), {
                  token: item.token
                });
              }
            });
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (utils.isArray(idSet)) {
            idSet.forEach(function (item) {
              var action = item.action,
                  token = item.token;
              signal.remove(action, token);
            });
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props,
              forwardRef = _this$props.forwardRef,
              restProps = _objectWithoutProperties(_this$props, ["forwardRef"]);

          return /*#__PURE__*/React__default.createElement(SourceComponent, _extends({}, restProps, {
            ref: this.sourceRef
          }));
        }
      }]);

      return TargetComponent;
    }(React.Component);

    var InheritTargetComponent = hoistNonReactStatics(TargetComponent, SourceComponent);
    return /*#__PURE__*/React__default.forwardRef(function (props, ref) {
      return /*#__PURE__*/React__default.createElement(InheritTargetComponent, _extends({}, props, {
        forwardRef: ref
      }));
    });
  };
};

var emit = signal.emit;

exports.connect = connect;
exports.emit = emit;
