import React from 'react';
import {
  StaticRouter,
} from 'react-router-dom';
import {
  Provider,
  useStaticRendering,
} from 'mobx-react';
import { JssProvider } from 'react-jss';
import {
  MuiThemeProvider,
} from 'material-ui/styles';
import App from './views/App';
import { createStoreMap } from './store/store';

useStaticRendering(true); // 让mobx在服务端渲染的时候不会重复数据变换

export default (stores, routerContext, sheetsRegistry, jss, theme, url) => (
  <Provider {...stores} >
    <StaticRouter
      location={url}
      context={routerContext}
    >
      <JssProvider
        jss={jss}
        registry={sheetsRegistry}
      >
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
);
export { createStoreMap };
