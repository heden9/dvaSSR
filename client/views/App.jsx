/**
 * 声明整个页面的内容
 */
import React from 'react';
import dva from 'dva';
import createMemoryHistory from 'history/createMemoryHistory'; // 重要
import {
  Link,
} from 'react-router-dom';
import './test.less';
import Routes from '../router';

const Test = dva({
  history: createMemoryHistory(),
});
Test.router(() => (
  <div>
    <Link to="/list">list</Link>
    <Link to="/home">home</Link>
    <Routes />
  </div>
));
// class App extends React.Component {
//   componentDidMount() {
//     // ..
//   }
//   render() {
//     return (
//       <div>
//         <p className="ppp">loremssshahahhs</p>
//       </div>
//     );
//   }
// }
const hah = Test.start();
console.log(hah);
export default hah;
