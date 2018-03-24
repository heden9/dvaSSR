import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  withRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import dynamic from '../utils/dynamic';
import Icon from '../components/icon';

const NavBar = withRouter(connect(({
  count: {
    value: count,
  },
}) => ({ count }))(({ count }) => (
  <Fragment>
    <span>{count}</span>
    <Icon type={require('../assets/icon/home.svg')} alt="" />
    <br />
    <Link to="/list">list</Link>
    <Link to="/home">home</Link>
  </Fragment>
)));


function Main({ app }) {
  const routes = [
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "chunk-home" */ '../pages/index'),
    },
    {
      path: '/list',
      component: () => import(/* webpackChunkName: "chunk-list" */ '../pages/list'),
    },
  ];

  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route key={1} path="/" exact render={() => <Redirect to="/list" />} />,
        {
          routes.map(({ path, ...dynamics }) => (
            <Route
              exact
              key={path}
              path={path}
              component={dynamic({
                app,
                ...dynamics,
              })}
            />
          ))
        }
      </Switch>
    </Fragment>
  );
}
export default Main;
