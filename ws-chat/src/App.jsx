import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import './App.css';

import Login from './components/Login/Login';
import MessagingPanel from './components/MessagingPanel/MessagingPanel';

import { addUsernameAction, deleteUsernameAction } from './actions/username-actions';
import { addMessagesAction, deleteMessagesAction } from './actions/messages-actions';

import Notification from './Notification';

import Api from './api';

class App extends React.Component {
  state = {
    connection: true,
  }

  connection = Api.init();

  componentDidMount() {
    this.connection.onmessage = ({ data }) => {
      console.log(data);
      const { addMessages } = this.props;
      addMessages(JSON.parse(data).reverse());
      if (document.hidden) {
        JSON.parse(data).forEach((message) => {
          console.log(message);
          Notification(message.from, message.message);
        });
      }
    };

    this.connection.onopen = () => {
      if (localStorage.getItem('messages')) {
        const messages = JSON.parse(localStorage.getItem('messages'));
        messages.forEach((message) => {
          this.connection.send(JSON.stringify(message));
        });
        localStorage.removeItem('messages');
      }
    };

    this.connection.onclose = () => {
      this.setState({ connection: false });
    };
  }

  reconnect = () => {
    const { deleteMessages, addMessages } = this.props;
    deleteMessages();
    this.connection = Api.init();
    this.setState({ connection: true });
    this.connection.onmessage = ({ data }) => {
      console.log(data);
      addMessages(JSON.parse(data).reverse());
      if (document.hidden) {
        JSON.parse(data).forEach((message) => {
          console.log(message);
          Notification(message.from, message.message);
        });
      }
    };

    this.connection.onopen = () => {
      if (localStorage.getItem('messages')) {
        const messages = JSON.parse(localStorage.getItem('messages'));
        messages.forEach((message) => {
          this.connection.send(JSON.stringify(message));
        });
        localStorage.removeItem('messages');
      }
    };

    this.connection.onclose = () => {
      this.setState({ connection: false });
    };
  }

  closeConnect = () => {
    this.connection.close();
  }

  render() {
    const {
      username, addUsername, messages, addMessages, deleteUsername,
    } = this.props;
    const { connection } = this.state;
    console.log(this.props);
    if (localStorage.getItem('username')) {
      addUsername(localStorage.getItem('username'));
    }
    return (
      <div className="App">
        {
          connection
            ? (
              <Button className="button-online-offline" onClick={this.closeConnect} variant="contained" color="primary" type="submit">
                Online
              </Button>
            )
            : (
              <Button className="button-online-offline" onClick={this.reconnect} variant="contained" color="secondary" type="submit">
                Offline
              </Button>
            )
        }
        {
          !username
            ? <Login addUsername={addUsername} />
            : (
              <MessagingPanel
                username={username}
                messages={messages}
                addMessages={addMessages}
                deleteUsername={deleteUsername}
                connection={this.connection}
              />
            )
        }
      </div>
    );
  }
}

App.propTypes = {
  username: PropTypes.string.isRequired,
  addUsername: PropTypes.func.isRequired,
  addMessages: PropTypes.func.isRequired,
  deleteUsername: PropTypes.func.isRequired,
  deleteMessages: PropTypes.func.isRequired,
  messages: PropTypes.any.isRequired,
};

const mapStateToProps = (store) => (
  {
    username: store.usernameState.username,
    messages: store.messagesState.messages,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    addUsername: (username) => {
      dispatch(addUsernameAction(username));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
