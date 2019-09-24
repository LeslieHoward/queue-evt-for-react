import React, { Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Signal } from 'queue-evt';

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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
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

var signal = new Signal();

var connect = function connect(idSet) {
  return function (SourceComponent) {
    var TargetComponent =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(TargetComponent, _Component);

      function TargetComponent(props) {
        var _this;

        _this = _Component.call(this, props) || this;
        _this.sourceRef = _this.props.forwardRef || React.createRef();
        return _this;
      }

      var _proto = TargetComponent.prototype;

      _proto.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (utils.notNull(this.sourceRef.current) && utils.isArray(idSet)) {
          idSet.forEach(function (item) {
            var action = item.action,
                handler = item.handler;
            item.token = utils.uuid();

            if (typeof handler === 'function') {
              signal.on(action, handler.bind(_this2.sourceRef.current), {
                token: item.token
              });
            }
          });
        }
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        if (utils.isArray(idSet)) {
          idSet.forEach(function (item) {
            var action = item.action,
                token = item.token;
            signal.remove(action, token);
          });
        }
      };

      _proto.render = function render() {
        var _this$props = this.props,
            forwardRef = _this$props.forwardRef,
            restProps = _objectWithoutPropertiesLoose(_this$props, ["forwardRef"]);

        return React.createElement(SourceComponent, _extends({}, restProps, {
          ref: this.sourceRef
        }));
      };

      return TargetComponent;
    }(Component);

    var InheritTargetComponent = hoistNonReactStatics(TargetComponent, SourceComponent);
    return React.forwardRef(function (props, ref) {
      return React.createElement(InheritTargetComponent, _extends({}, props, {
        forwardRef: ref
      }));
    });
  };
};

var emit = signal.emit;

export { connect, emit };
