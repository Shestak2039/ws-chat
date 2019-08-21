import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { deleteUsernameAction } from '../../actions/username-actions';
import { addMessagesAction, deleteMessagesAction } from '../../actions/messages-actions';

import DisplayConversation from '../DisplayConversation/DisplayConversation';
import MessagingBox from '../MessagingBox/MessagingBox';

import Api from '../../services/api';
import Notification from '../../services/Notification';
import { localStorageDelete, localStorageGet, localStorageSet } from '../../services/localStorage.service';

import './messaging-panel.css';

class MessagingPanel extends Component {
  state = {
    isConnection: true,
  }

  connection = Api.init();

  componentDidMount() {
    this.connection.onmessage = this.connenctionOnMessage;
    this.connection.onopen = this.connectionOnOpen;
    this.connection.onclose = this.connectionOnClose;
  }

  connenctionOnMessage = ({ data }) => {
    const { addMessages } = this.props;

    addMessages(JSON.parse(data).reverse());

    if (document.hidden) {
      JSON.parse(data).forEach((message) => {
        Notification(message.from, message.message);
      });
    }
  }

  connectionOnOpen = () => {
    if (localStorageGet('messages')) {
      const messages = JSON.parse(localStorageGet('messages'));

      messages.forEach((message) => {
        this.connection.send(JSON.stringify(message));
      });

      localStorageDelete('messages');
    }
  }

  reconnect = () => {
    const { deleteMessages } = this.props;

    deleteMessages();

    this.connection = Api.init();
    this.setState({ isConnection: true });

    this.connection.onmessage = this.connenctionOnMessage;
    this.connection.onopen = this.connectionOnOpen;
    this.connection.onclose = this.connectionOnClose;
  }

  connectionOnClose = () => {
    this.setState({ isConnection: false });
  }

  closeConnect = () => {
    this.connection.close();
  }

  sendMessage = (message) => {
    const { username } = this.props;

    if (this.connection.readyState === 1) {
      const data = { from: username, message };

      this.connection.send(JSON.stringify(data));
    } else if (this.connection.readyState === 3) {
      if (localStorageGet('messages')) {
        const oldMessages = JSON.parse(localStorageGet('messages'));

        oldMessages.push({ from: username, message });

        localStorageSet('messages', JSON.stringify(oldMessages));
      } else {
        const messages = [{ from: username, message }];

        localStorageSet('messages', JSON.stringify(messages));
      }
    }
  }

  logOut = () => {
    const { deleteUsername, deleteMessages } = this.props;

    deleteUsername();
    deleteMessages();

    localStorageDelete('username');
  }

  render() {
    const { messages, username } = this.props;
    const { isConnection } = this.state;

    return (
      <>
        <Button className="messaging-panel__button-logout" onClick={this.logOut} variant="contained" color="primary">
          Log Out
        </Button>
        <div className="messaging-panel__username">{`Nickname: ${username}`}</div>
        {
          isConnection
            ? (
              <Button
                className="messaging-panel__button-online-offline"
                onClick={this.closeConnect}
                variant="contained"
                color="primary"
                type="submit"
              >
                Online
              </Button>
            )
            : (
              <Button
                className="messaging-panel__button-online-offline"
                onClick={this.reconnect}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Offline
              </Button>
            )
        }
        <DisplayConversation messages={messages} />
        <MessagingBox sendMessage={this.sendMessage} />
      </>
    );
  }
}

MessagingPanel.propTypes = {
  username: PropTypes.string.isRequired,
  deleteUsername: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteMessages: PropTypes.func.isRequired,
  addMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    username: state.usernameState.username,
    messages: state.messagesState.messages,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    addMessages: (messages) => {
      dispatch(addMessagesAction(messages));
    },
    deleteUsername: () => {
      dispatch(deleteUsernameAction());
    },
    deleteMessages: () => {
      dispatch(deleteMessagesAction());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MessagingPanel);
