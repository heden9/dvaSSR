/**
 * 应用入口
 */
import React from 'react'; // 每个jsx，React组件文件，都必须引入React
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import App from './views/App';

const initialState = window.__INITIAL__STATE__ || {}; // eslint-disable-line
console.log(initialState);
// ReactDOM.hydrate(
// 使用hydrate来替换render
// hydrate 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，并补充事件绑定等 Client 特有内容的过程。
//   <App/>,
//   document.getElementById('root')
// );

const root = document.getElementById('root');

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  );
};

const initConfig = {
  history: createBrowserHistory(),
  initialState: window.__INITIAL__STATE__ || {}, // eslint-disable-line  
};
// 我想刷个绿点
render(App(initConfig).start());

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = App(initConfig).start();
    render(NextApp);
  });
}
