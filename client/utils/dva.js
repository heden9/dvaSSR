/**
 * 声明整个页面的内容
 */
import dva from 'dva';

export function create({
  models = [], routes, history, ...config
}) {
  const app = dva({
    history,
    ...config,
  });
  models.forEach((item) => {
    app.model(item);
  });
  app.router(routes);
  return app;
}
