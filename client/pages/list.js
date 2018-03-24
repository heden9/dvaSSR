import React, { Fragment } from 'react';

import { connect } from 'react-redux';


function mapStateToProps({ count: { value } }) {
  return { count: value };
}
function mapDispatchToProps(dispatch) {
  return {
    add() {
      dispatch({ type: 'count/save', payload: { value: 1 } });
    },
    reduce() {
      dispatch({ type: 'count/save', payload: { value: -1 } });
    },
  };
}

class HomePage extends React.Component {
  render() {
    const { count, add } = this.props;
    return (
      <Fragment>
        <div>page:  List</div>
        <span>{ count }</span>
        <button onClick={add} >click e</button>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
