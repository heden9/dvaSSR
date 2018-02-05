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
  const app = core.create(config);
  models.forEach((item) => {
    app.model(item);
  });
  app.start();
  if (!isServer) {
    app.start = () => routes;
  }
  return app;
}
