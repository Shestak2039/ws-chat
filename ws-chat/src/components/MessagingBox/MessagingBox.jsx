import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessagingBox extends Component {
  messageHandler = (e) => {
    if (e.keyCode === 13) {
      const { sendMessage } = this.props;
      e.preventDefault();
      sendMessage(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <div id="messagingBox">
        <textarea onKeyDown={this.messageHandler} />
      </div>
    );
  }
}

MessagingBox.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default MessagingBox;
