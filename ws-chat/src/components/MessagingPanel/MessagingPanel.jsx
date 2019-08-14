import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import DisplayConversation from '../DisplayConversation/DisplayConversation';
import MessagingBox from '../MessagingBox/MessagingBox';

import './messaging-panel.css';

class MessagingPanel extends Component {
  sendMessage = (message) => {
    const { username, connection } = this.props;
    if (connection.readyState === 1) {
      const data = { from: username, message };
      connection.send(JSON.stringify(data));
    } else if (connection.readyState === 3) {
      if (localStorage.getItem('messages')) {
        const oldMessages = JSON.parse(localStorage.getItem('messages'));
        oldMessages.push({ from: username, message });
        localStorage.setItem('messages', JSON.stringify(oldMessages));
      } else {
        localStorage.setItem('messages', JSON.stringify([{ from: username, message }]));
      }
    }
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
        <Button className="button-logout" variant="contained" color="primary" onClick={this.logOut}>
          Log Out
        </Button>
        <DisplayConversation messages={messages} />
        <MessagingBox sendMessage={this.sendMessage} />
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
