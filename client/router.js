import React from 'react';
import { connect } from 'dva';
import {
  Route,
  Redirect,
} from 'dva/router';

function mapStateToProps({ comment: { value } }) {
  return { count: value };
}
function mapDispatchToProps(dispatch) {
  console.log(arguments); // eslint-disable-line
  return {
    add() {
      dispatch({ type: 'comment/save', payload: { value: 1 } });
    },
    reduce() {
      dispatch({ type: 'comment/save', payload: { value: -1 } });
    },
  };
}
const Home = connect(mapStateToProps, mapDispatchToProps)(({ count, add }) => (
  <div>
    <span>{ count }</span>
    <button onClick={add} >click me</button>
  </div>
));
const Router = () => [
  <Route key={1} path="/" exact render={() => <Redirect to="/list" />} />,
  <Route key={2} path="/list" component={() => <div>list2</div>} />,
  <Route key={3} path="/home" component={Home} />,
];


export default Router;
