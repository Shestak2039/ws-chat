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
    return messages.map((message) => (
      <div className="message" key={message.id}>
        <span className="message__nickname-and-time">
          {`(${moment(message.time).format('L')}, ${moment(message.time).format('LT')})${message.from.length > 23 ? `${message.from.slice(0, 20)}...` : message.from}: `}
        </span>
        <span className="message__text">
          {message.message}
        </span>
      </div>
    ));
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
  messages: PropTypes.any.isRequired,
};

export default DisplayConversation;
