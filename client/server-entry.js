import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import create from './views/App';

export default (app, routerContext, url) => {
  const App = app.start();
  return (
    <StaticRouter
      location={url}
      context={routerContext}
    >
      <Provider store={app._store} >
        <App />
      </Provider>
    </StaticRouter>
  );
};
export function getState() {
  return app._store.getState(); // eslint-disable-line
}
export {
  create,
};

