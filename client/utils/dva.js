/**
 * 声明整个页面的内容
 */
import * as core from 'dva-core';

export function create({
  models = [],
  routes,
  history,
  ...config
}, isServer) {
  const app = core.create(config, {
    setupApp(app_) {
      app_._history = patchHistory(history); // eslint-disable-line
    },
  });
  models.forEach((item) => {
    app.model(item);
  });
  app.start();
  if (!isServer) {
    app.start = () => routes;
  }
  return app;
}

function patchHistory(history) {
  const oldListen = history.listen;
  history.listen = (callback) => {
    callback(history.location);
    return oldListen.call(history, callback);
  };
  return history;
}
