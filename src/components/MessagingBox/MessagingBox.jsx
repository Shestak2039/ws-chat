import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './messaging-box.css';

class MessagingBox extends Component {
  messageHandler = (e) => {
    if (e.keyCode === 13) {
      const { sendMessage } = this.props;
      e.preventDefault();
      if (e.target.value !== '') {
        sendMessage(e.target.value);
        e.target.value = '';
      }
    }
  }

  messageHandlerClick = () => {
    const { sendMessage } = this.props;
    const message = document.getElementById('filled-dense-multiline').value;
    if (message !== '') {
      sendMessage(message);
      document.getElementById('filled-dense-multiline').value = '';
    }
  }

  render() {
    return (
      <div id="messaging-box">
        <TextField
          className="messaging-box__textfield"
          id="filled-dense-multiline"
          label="Message"
          margin="dense"
          variant="filled"
          multiline
          rowsMax="4"
          onKeyDown={this.messageHandler}
          required
        />
        <Button onClick={this.messageHandlerClick} variant="contained" color="primary" className="messaging-box__button-send">
          Send
        </Button>
      </div>
    );
  }
}

MessagingBox.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default MessagingBox;
