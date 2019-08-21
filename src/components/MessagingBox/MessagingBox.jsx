import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './messaging-box.css';

class MessagingBox extends Component {
  textField = React.createRef();

  messageHandlerKeyboard = (e) => {
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
    const message = this.textField.current.children[1].children[0].value;

    if (message !== '') {
      sendMessage(message);
      this.textField.current.children[1].children[0].value = '';
    }
  }

  render() {
    return (
      <div className="messaging-box">
        <TextField
          className="messaging-box__textfield"
          id="filled-dense-multiline"
          label="Message"
          margin="dense"
          variant="filled"
          multiline
          rowsMax="4"
          onKeyDown={this.messageHandlerKeyboard}
          ref={this.textField}
        />
        <Button
          onClick={this.messageHandlerClick}
          variant="contained"
          color="primary"
          className="messaging-box__button-send"
        >
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
