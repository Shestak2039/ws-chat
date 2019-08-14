import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {
  login = (e) => {
    const { addUsername } = this.props;
    e.preventDefault();
    localStorage.setItem('username', e.target.username.value);
    addUsername(e.target.username.value);
  }

  render() {
    return (
      <div id="login">
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

export default Login;
