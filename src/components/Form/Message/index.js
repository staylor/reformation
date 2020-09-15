import React, { Component } from 'react';
import { messageWrapClass, messageTextClass, dismissButtonClass } from './styled';

/* eslint-disable react/prop-types,jsx-a11y/control-has-associated-label */

export default class Message extends Component {
  state = {
    hidden: false,
  };

  onClick = () => {
    this.setState({ hidden: true });
  };

  render() {
    return this.state.hidden ? null : (
      <div className={messageWrapClass}>
        <p className={messageTextClass}>{this.props.text}</p>
        <button type="button" className={dismissButtonClass} onClick={this.onClick} />
      </div>
    );
  }
}
