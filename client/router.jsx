import React from 'react';
import {
  Route,
  Redirect,
} from 'dva/router';

const Router = () => [
  <Route key={1} path="/" exact render={() => <Redirect to="/list" />} />,
  <Route key={2} path="/list" component={() => <div>lists</div>} />,
  <Route key={3} path="/home" component={() => <div>home</div>} />,
];

export default Router;
