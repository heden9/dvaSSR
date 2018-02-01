import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';

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
const Home = connect(mapStateToProps, mapDispatchToProps)(({ count, add }) => (
  <div>
    <span>{ count }</span>
    <button onClick={add} >click me</button>
  </div>
));
const Router = () => [
  <Route key={1} path="/" exact render={() => <Redirect to="/list" />} />,
  <Route key={2} path="/list" component={() => <div>list</div>} />,
  <Route key={3} path="/home" component={Home} />,
];


export default Router;
