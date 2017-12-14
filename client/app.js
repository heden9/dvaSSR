/**
 * 应用入口
 */
import React from 'react'; // 每个jsx，React组件文件，都必须引入React
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
} from 'react-router-dom';
import {
  Provider,
} from 'mobx-react';
import {
  MuiThemeProvider,
  createMuiTheme,
} from 'material-ui/styles';
import {
  lightBlue,
  pink,
} from 'material-ui/colors';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import App from './views/App';
import AppState from './store/app-state';

const theme = createMuiTheme({ // 配置material主题
  palette: {
    primary: pink,
    accent: lightBlue,
    type: 'light',
  },
});
// ReactDOM.hydrate(
// 使用hydrate来替换render
// hydrate 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，并补充事件绑定等 Client 特有内容的过程。
//   <App/>,
//   document.getElementById('root')
// );
const initialState = window.__INITIAL__STATE__ || {}; // eslint-disable-line
const root = document.getElementById('root');

const createApp = TheApp => (
  class extends React.Component {
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    render() {
      return <TheApp />;
    }
  }
);

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Provider appState={new AppState(initialState.appState)}>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </Provider>
      </BrowserRouter>
    </AppContainer>,
    root,
  );
};

render(createApp(App));

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App'); // eslint-disable-line
    render(createApp(NextApp));
  });
}
