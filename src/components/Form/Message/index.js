// @flow
import React, { Component } from 'react';
import { messageWrapClass, messageTextClass, dismissButtonClass } from './styled';

type Props = {
  text: string,
};

type State = {
  hidden: boolean,
};

export default class Message extends Component<Props, State> {
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
