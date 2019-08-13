import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessagingBox extends Component {
  messageHandler = (e) => {
    if (e.keyCode === 13) {
      const { getMessage } = this.props;
      e.preventDefault();
      getMessage(e.target.value);
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
  getMessage: PropTypes.func.isRequired,
};

export default MessagingBox;
