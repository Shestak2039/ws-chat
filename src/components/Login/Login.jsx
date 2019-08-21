import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { addUsernameAction } from '../../actions/username-actions';
import { localStorageSet } from '../../services/localStorage.service';

class Login extends Component {
  login = (e) => {
    const { addUsername } = this.props;
    const { value } = e.target.username;

    e.preventDefault();

    localStorageSet('username', value);
    addUsername(value);
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.login}>
          <TextField
            id="username"
            label="Nickname"
            margin="normal"
            variant="outlined"
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Log In
          </Button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
