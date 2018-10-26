import React, { Component } from 'react';
import { connect } from '../dist/index';
import actions from './actions';

class Children extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const { data } = this.state;
    return <div style={{ height: 30, lineHeight: '30px', backgroundColor: '#eb523e', color: '#fff' }}>{data}</div>;
  }
}

export default connect([
  {
    action: actions.parent_children_0,
    handler(data) {
      this.setState({ data });
    }
  }
])(Children);
