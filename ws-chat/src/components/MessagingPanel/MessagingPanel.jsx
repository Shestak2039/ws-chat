import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DisplayConversation from '../DisplayConversation/DisplayConversation';
import MessagingBox from '../MessagingBox/MessagingBox';

class MessagingPanel extends Component {
  connection = new WebSocket('ws://st-chat.shas.tel');

  sendMessage = (message) => {
    const { username } = this.props;
    const data = { from: username, message };
    this.connection.send(JSON.stringify(data));
  }

  render() {
    const { messages, deleteUsername } = this.props;
    console.log(messages);
    return (
      <>
        <DisplayConversation messages={messages} />
        <MessagingBox sendMessage={this.sendMessage} />
        <button type="button" onClick={deleteUsername}>Log out</button>
      </>
    );
  }
}

MessagingPanel.propTypes = {
  username: PropTypes.string.isRequired,
  addMessages: PropTypes.func.isRequired,
  deleteUsername: PropTypes.func.isRequired,
  messages: PropTypes.any.isRequired,
};

export default MessagingPanel;
