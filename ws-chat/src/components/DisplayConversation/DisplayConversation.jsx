import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayConversation extends Component {
  displayMessage = () => {
    const { messages } = this.props;
    return messages.map((message) => (
      <div>
        {`${message.from} : ${message.message}`}
      </div>
    ));
  }

  render() {
    return (
      <div id="displayConversation">
        { this.displayMessage() }
      </div>
    );
  }
}

DisplayConversation.propTypes = {
  messages: PropTypes.arrayOf.isRequired,
};

export default DisplayConversation;
