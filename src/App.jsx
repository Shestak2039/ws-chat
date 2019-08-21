import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Login from './components/Login/Login';
import MessagingPanel from './components/MessagingPanel/MessagingPanel';

import { addUsernameAction } from './actions/username-actions';

import { localStorageGet } from './services/localStorage.service';

class App extends React.Component {
  componentDidMount() {
    const { addUsername } = this.props;

    if (localStorageGet('username')) {
      addUsername(localStorageGet('username'));
    }
  }

  render() {
    const { username } = this.props;

    return (
      <>
        {
          !username
            ? <Login />
            : <MessagingPanel />
        }
      </>
    );
  }
}

App.propTypes = {
  username: PropTypes.string.isRequired,
  addUsername: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    username: state.usernameState.username,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    addUsername: (username) => {
      dispatch(addUsernameAction(username));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
