// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import { textareaClass } from './styled';

type Props = {
  value: string,
  className?: string | null,
  onChange?: (value: string) => void,
  bindRef?: (element: any) => void,
};

type State = {
  value: string,
};

export default class Textarea extends Component<Props, State> {
  state = {
    value: this.props.value || '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value === prevState.value) {
      return null;
    }
    return { value: nextProps.value || '' };
  }

  onChange = (e: { target: HTMLTextAreaElement }) => {
    const value = e.target.value || '';
    this.setState({ value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  };

  render() {
    const { className, onChange, value, bindRef, ...props } = this.props;
    return (
      <textarea
        {...props}
        ref={bindRef}
        className={cx(textareaClass, className)}
        onChange={this.onChange}
        value={this.state.value}
      />
    );
  }
}

Textarea.defaultProps = {
  className: null,
  onChange: () => null,
  bindRef: () => null,
};
