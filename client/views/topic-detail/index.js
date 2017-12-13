import React from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import Helmet from 'react-helmet';

export default class TopicDetail extends React.Component {
  componentDidMount() {

  }
  getTopics = () => {
    axios.get('/api/topics')
      .then((resp) => {
        console.log(resp);
      });
  }
  markAll = () => {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then((resp) => {
        console.log(resp);
      });
  }
  login = () => {
    axios.post('/api/user/login', {
      accessToken: '2aecc8b6-2b6f-46ee-86c6-3eb1a38e9cdc',
    })
      .then((resp) => {
        console.log(resp);
      });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>this is topic detail</title>
          <meta name="description" content="this is topic detail" />
        </Helmet>
        <Button raised color="primary" onClick={this.login}>login</Button>
        <Button onClick={this.getTopics}>topics</Button>
        <Button onClick={this.markAll}>markAll</Button>
      </div>
    );
  }
}
