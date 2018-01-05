import React from 'react';
import { StaticRouter } from 'dva/router';
import createMemoryHistory from 'history/createMemoryHistory';
import create from './views/App';

const app = create({
  history: createMemoryHistory(),
  initialState: {},
});
const App = app.start();
export default (routerContext, url) => (
  <StaticRouter
    location={url}
    context={routerContext}
  >
    <App />
  </StaticRouter>
);
export function getState() {
  return app._store.getState(); // eslint-disable-line
}
