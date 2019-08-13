import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  login = (e) => {
    const { setUsername } = this.props;
    e.preventDefault();
    setUsername(e.target.username.value);
  }

  render() {
    return (
      <div id="login">
        <form onSubmit={this.login}>
          <br />
          <input type="text" id="username" />
          <br />
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  setUsername: PropTypes.func.isRequired,
};

export default Login;
