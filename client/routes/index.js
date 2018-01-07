import React from 'react';
import { connect } from 'dva';
import { Link, Router } from 'dva/router';
import Routes from './router';
import Icon from '../components/icon';

const Main = ({ history, count }) => (
  <Router history={history}>
    <div>
      <span>{count}</span>
      <Icon type={require('../assets/icon/home.svg')} alt="" />
      <br />
      <Link to="/list">list</Link>
      <Link to="/home">home</Link>
      <Routes />
    </div>
  </Router>
);
const WrapMain = connect(({ count: { value: count } }) => ({ count }))(Main);
export default props => <WrapMain {...props} />;
