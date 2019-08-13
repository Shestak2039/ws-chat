import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

class DisplayConversation extends Component {
  displayMessage = () => {
    const { messages } = this.props;
    return messages.map((message) => (
      <div key={message.id}>
        {`${message.from}(${moment(message.time).format('L')} ${moment(message.time).format('LT')}) : ${message.message}`}
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
  messages: PropTypes.any.isRequired,
};

export default DisplayConversation;
