import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import './display-conversation.css';

class DisplayConversation extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  displayMessage = () => {
    const { messages } = this.props;

    return messages.map((message) => {
      const day = moment(message.time).format('L');
      const time = moment(message.time).format('LT');
      const nickname = message.from.length > 23 ? `${message.from.slice(0, 20)}...` : message.from;

      return (
        <div className="display-conversation__message" key={message.id}>
          <span className="display-conversation__message_nickname-and-time">
            {`(${day}, ${time})${nickname}: `}
          </span>
          <span className="display-conversation__message_text">
            {message.message}
          </span>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="display-conversation">
        { this.displayMessage() }
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => { this.messagesEnd = el; }}
        />
      </div>
    );
  }
}

DisplayConversation.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DisplayConversation;
