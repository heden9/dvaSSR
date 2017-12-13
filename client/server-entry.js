import React from 'react';
import {
  StaticRouter,
} from 'react-router-dom';
import {
  Provider,
  useStaticRendering,
} from 'mobx-react';
import App from './views/App';
import { createStoreMap } from './store/store';

useStaticRendering(true); // 让mobx在服务端渲染的时候不会重复数据变换

export default (stores, routerContext, url) => (
  <Provider {...stores} >
    <StaticRouter
      location={url}
      context={routerContext}
    >
      <App />
    </StaticRouter>
  </Provider>
);
export { createStoreMap };
