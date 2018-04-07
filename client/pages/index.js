/* eslint-disable*/

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './inedx.less';

const debug = (...arg) => console.log(...arg);
function mapStateToProps({ count: { value, list } }) {
  return { count: value, list };
}
function mapDispatchToProps(dispatch) {
  return {
    add() {
      dispatch({ type: 'count/add', payload: { value: [1, 2, 3] } });
    },
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class HomePage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) { // 只要props发生变化，就会被调用
    debug('getDerivedStateFromProps', nextProps, prevState);
    const { count } = nextProps;
    return {
      count,
    };
  }
  state = {
    name: 'lili',
    scrollTop: 0,
  }
  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    debug('componentDidUpdate', prevProps, prevState, snapshot);
    if (snapshot !== null) {
      this.listRef.current.scrollTop +=
        this.listRef.current.scrollHeight - snapshot;
    }
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    debug('getSnapshotBeforeUpdate', prevProps, prevState, this.listRef);
    if (prevProps.list.length < this.props.list.length) {
      return this.listRef.current.scrollHeight;
    }
    return null;
  }
  listRef = React.createRef();
  render() {
    const { name, count, scrollTop } = this.state;
    const { list } = this.props;
    return (
      <Fragment>
        <div>page:  Home, my name is {name}</div>
        <span>{ count }</span>
        <div className="title">{scrollTop}</div>
        <button onClick={this.props.add} >click me</button>
        <div className="box" ref={this.listRef} >
          {
            list.map((item, index) => <div key={index}>{item}</div>) // eslint-disable-line
          }
        </div>
      </Fragment>
    );
  }
}
export default HomePage;
