import React, { Component } from "react";
import ReactDOM from "react-dom";
import { emit } from "../../dist/react-evt";
import ChildrenA from "./childrenA";
import ChildrenB from "./childrenB";
import actions from "./actions";

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateInfo: 1,
    };
    this.ChildrenARef = React.createRef();
    this.ChildrenBRef = React.createRef();
  }

  componentDidMount() {
    console.log("ChildrenARef", this.ChildrenARef);
    console.log("ChildrenBRef", this.ChildrenBRef);
  }

  onClick = () => {
    this.setState(
      ({ updateInfo }) => ({
        number: Math.random(),
        updateInfo: (updateInfo += 1),
      }),
      () => {
        const { number } = this.state;
        emit(actions.parent_children_0, number);
      }
    );
  };

  render() {
    const { updateInfo } = this.state;
    return (
      <div>
        <ChildrenA updateInfo={updateInfo} ref={this.ChildrenARef} />
        <ChildrenB updateInfo={updateInfo} ref={this.ChildrenBRef} />
        <button onClick={this.onClick}>点击</button>
      </div>
    );
  }
}

ReactDOM.render(<Parent />, document.getElementById("root"));
