/**
 * 应用入口
 */
import React from 'react'; // 每个jsx，React组件文件，都必须引入React
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import App from './views/App';

const initialState = window.__INITIAL__STATE__ || {}; // eslint-disable-line
// ReactDOM.hydrate(
// 使用hydrate来替换render
// hydrate 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，并补充事件绑定等 Client 特有内容的过程。
//   <App/>,
//   document.getElementById('root')
// );
const initConfig = {
  initialState, // eslint-disable-line
  history: createBrowserHistory(),
};
const app = App(initConfig);
const root = document.getElementById('root');

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={app._store} >
        <BrowserRouter>
          <Component app={app} />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  );
};

// 我想刷个绿点
render(app.start());

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = App(initConfig).start();
    render(NextApp);
  });
}
