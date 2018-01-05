import React from 'react';
import { connect } from 'dva';
import { Link, Router } from 'dva/router';
import Routes from '../router';

const Main = ({ history, count }) => (
  <Router history={history}>
    <div>
      <span>{count}</span>
      <div className="ppp">
        <img src={require('../assets/yay.jpg')} alt="" />
      </div>
      <img src={require('../assets/icon/home.svg')} alt="" />
      <Link to="/list">list</Link>
      <Link to="/home">home</Link>
      <Routes />
    </div>
  </Router>
);
const WrapMain = connect(({ comment: { value: count } }) => ({ count }))(Main);
export default props => <WrapMain {...props} />;
