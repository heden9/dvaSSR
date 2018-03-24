import React, { Fragment } from 'react';
import axios from 'axios';
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
  componentDidMount() {
    axios.get('/').then((data) => {
      console.log(data);
    }).catch((e) => { console.log(e); });
  }
  render() {
    const { count, add } = this.props;
    return (
      <Fragment>
        <div>page:  Home</div>
        <span>{ count }</span>
        <button onClick={add} >click me</button>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
