import React from 'react';
import { StaticRouter } from 'dva/router';
import App from './views/App';

export default (routerContext, url) => (
  <StaticRouter
    location={url}
    context={routerContext}
  >
    <App />
  </StaticRouter>
);
