import React, { Component } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { Signal } from "queue-evt";
import utils from "./utils";

const signal = new Signal();

const connect = (idSet) => (SourceComponent) => {
  class TargetComponent extends Component {
    constructor(props) {
      super(props);
      this.sourceRef = this.props.forwardRef || React.createRef();
    }

    componentDidMount() {
      if (utils.notNull(this.sourceRef.current) && utils.isArray(idSet)) {
        idSet.forEach((item) => {
          const { action, handler } = item;
          item.token = utils.uuid();
          if (typeof handler === "function") {
            signal.on(action, handler.bind(this.sourceRef.current), {
              token: item.token,
            });
          }
        });
      }
    }

    componentWillUnmount() {
      if (utils.isArray(idSet)) {
        idSet.forEach((item) => {
          const { action, token } = item;
          signal.remove(action, token);
        });
      }
    }
    render() {
      const { forwardRef, ...restProps } = this.props;
      return <SourceComponent {...restProps} ref={this.sourceRef} />;
    }
  }
  const InheritTargetComponent = hoistNonReactStatics(
    TargetComponent,
    SourceComponent
  );
  return React.forwardRef((props, ref) => {
    return <InheritTargetComponent {...props} forwardRef={ref} />;
  });
};

const emit = signal.emit;

export { connect, emit };
