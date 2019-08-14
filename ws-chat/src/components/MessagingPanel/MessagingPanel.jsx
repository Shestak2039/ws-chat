import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DisplayConversation from '../DisplayConversation/DisplayConversation';
import MessagingBox from '../MessagingBox/MessagingBox';

import Button from '@material-ui/core/Button';

class MessagingPanel extends Component {
  sendMessage = (message) => {
    const { username, connection } = this.props;
    const data = { from: username, message };
    connection.send(JSON.stringify(data));
  }

  logOut = () => {
    const { deleteUsername } = this.props;
    deleteUsername();
    localStorage.removeItem('username');
  }

  render() {
    const { messages } = this.props;
    console.log(messages);
    return (
      <>
        <DisplayConversation messages={messages} />
        <MessagingBox sendMessage={this.sendMessage} />
        <Button variant="contained" color="primary" onClick={this.logOut}>
          Log Out
        </Button>
      </>
    );
  }
}

MessagingPanel.propTypes = {
  username: PropTypes.string.isRequired,
  deleteUsername: PropTypes.func.isRequired,
  connection: PropTypes.instanceOf(WebSocket).isRequired,
  messages: PropTypes.any.isRequired,
};

export default MessagingPanel;
