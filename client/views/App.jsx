
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import {
  inject,
  observer,
} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Routes from '../config/router';
import AppState from '../store/app-state';

@inject('appState') // 注入mobx的store
@withRouter // 没有这个的话...嘻嘻 组件不会刷新哦
@observer // 添加观察者
export default class App extends React.Component {
  componentDidMount() {
    // todo
  }
  render() {
    return [
      <div key="banner">
        <DevTools />
        <div>{this.props.appState.name}</div>
        <Link to="/list">首页</Link>
        <br />
        <Link to="/detail">详情页</Link>
        <Routes />
      </div>,
    ];
  }
}

App.propTypes = {
  appState: PropTypes.instanceOf(AppState),

};
