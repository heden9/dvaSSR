import React from 'react';
import PropTypes from 'prop-types';
import {
  inject,
  observer,
} from 'mobx-react';
import Helmet from 'react-helmet';
import AppState from '../../store/app-state';

@inject('appState')
@observer
export default class TopicList extends React.Component {
  changeHandle = (e) => {
    this.props.appState.changeName(e.target.value);
  };
  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.changeName('xiix');
        resolve(true);
      });
    });
  }
  render() {
    const { appState } = this.props;
    return (
      <div>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        name: {appState.name}
      </div>
    );
  }
}


TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),

};
