import React, { Component } from 'react';
import './App.css';

import Login from './components/Login/Login';
import MessagingPanel from './components/MessagingPanel/MessagingPanel';

class App extends Component {
  state = {
    username: null,
  }

  setUsername = (username) => {
    this.setState({ username });
  }

  render() {
    const { username } = this.state;
    return (
      <div className="App">
        {
          !username
            ? <Login setUsername={this.setUsername} />
            : <MessagingPanel username={username} />
        }
      </div>
    );
  }
}

export default App;
