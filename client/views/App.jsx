/**
 * 声明整个页面的内容
 */
import React from 'react';
import dva from 'dva';
import createMemoryHistory from 'history/createMemoryHistory'; // 重要
// import createBrowserHistory from 'history/createBrowserHistory';
import {
  Link,
  Router,
} from 'react-router-dom';
import './test.less';
import Routes from '../router';

const Test = dva({
  history: createMemoryHistory(),
});

Test.model(require('./model'));

Test.router(({ history }) => (
  <Router history={history}>
    <div>
      <div className="ppp" >
        <img src={require('../assets/yay.jpg')} alt="" />
      </div>
      <img src={require('../assets/icon/home.svg')} alt="" />
      <Link to="/list">list</Link>
      <Link to="/home">home</Link>
      <Routes />
    </div>
  </Router>
));
const hah = Test.start();
console.log(hah);
export default hah;
