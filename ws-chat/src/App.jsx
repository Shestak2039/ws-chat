import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './App.css';

import Login from './components/Login/Login';
import MessagingPanel from './components/MessagingPanel/MessagingPanel';

import { addUsernameAction, deleteUsernameAction } from './actions/username-actions';
import addMessagesAction from './actions/messages-actions';

class App extends React.Component {
  connection = new WebSocket('ws://st-chat.shas.tel');

  componentDidMount() {
    this.connection.onmessage = ({ data }) => {
      console.log(data);
      const { addMessages } = this.props;
      addMessages(JSON.parse(data).reverse());
    };
  }

  render() {
    const {
      username, addUsername, messages, addMessages, deleteUsername,
    } = this.props;
    console.log(this.props);
    return (
      <div className="App">
        {
          username === ''
            ? <Login setUsername={addUsername} />
            : (
              <MessagingPanel
                username={username}
                messages={messages}
                addMessages={addMessages}
                deleteUsername={deleteUsername}
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
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
