import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DisplayConversation from '../DisplayConversation/DisplayConversation';
import MessagingBox from '../MessagingBox/MessagingBox';

class MessagingPanel extends Component {
  state = {
    messages: [],
  }

  connection = new WebSocket('ws://st-chat.shas.tel');

  componentDidMount() {
    this.connection.onmessage = (message) => {
      console.log(message);
      const { messages } = this.state;
      const data = JSON.parse(message.data);
      this.setState({ messages: [...messages, data.message] });
    };
  }

  getMessage = (message) => {
    const { username } = this.props;
    const data = { from: username, message };
    this.connection.send(JSON.stringify(data));
  }

  render() {
    const { messages } = this.state;
    return (
      <>
        <DisplayConversation messages={messages} />
        <MessagingBox getMessage={this.getMessage} />
      </>
    );
  }
}

MessagingPanel.propTypes = {
  username: PropTypes.string.isRequired,
};

export default MessagingPanel;
