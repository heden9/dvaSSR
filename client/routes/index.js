import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Routes from './router';
import Icon from '../components/icon';

const Main = ({ count }) => (
  <div>
    <span>{count}</span>
    <Icon type={require('../assets/icon/home.svg')} alt="" />
    <br />
    <Link to="/list">list</Link>
    <Link to="/home">home</Link>
    <Routes />
  </div>
);
const WrapMain = connect(({
  count: {
    value: count,
  },
}) => ({ count }))(Main);
export default withRouter(WrapMain);
