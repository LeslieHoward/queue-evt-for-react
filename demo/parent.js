import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import ChildrenA from './childrenA';
import ChildrenB from './childrenB';
import { emit } from '../dist/index';
import actions from './actions';

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateInfo: 1
    };
    this.ChildrenARef = React.createRef();
    this.ChildrenBRef = React.createRef();
  }

  componentDidMount() {
    console.log('ChildrenARef', this.ChildrenARef);
    console.log('ChildrenBRef', this.ChildrenBRef);
  }

  onClick = () => {
    this.setState(
      ({ updateInfo }) => ({
        number: Math.random(),
        updateInfo: (updateInfo += 1)
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
        <Button onClick={this.onClick}>点击</Button>
      </div>
    );
  }
}

ReactDOM.render(<Parent />, document.getElementById('root'));
