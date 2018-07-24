// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import type { ClassNameArg } from 'types/emotion';
import { inputClass } from './styled';

type Props = {
  value: string,
  className?: ClassNameArg,
  onChange?: (value: string) => void,
  bindRef?: (element: any) => void,
};

type State = {
  value: string,
};

export default class Input extends Component<Props, State> {
  state = {
    value: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value === prevState.value) {
      return null;
    }
    return { value: nextProps.value || '' };
  }

  onChange = (e: { target: HTMLInputElement }) => {
    const value = e.target.value || '';
    this.setState({ value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  };

  render() {
    const { className, onChange, bindRef, value, ...props } = this.props;
    return (
      <input
        type="text"
        {...props}
        ref={bindRef}
        className={cx(inputClass, className)}
        onChange={this.onChange}
        defaultValue={this.state.value}
      />
    );
  }
}

Input.defaultProps = {
  className: null,
  onChange: () => null,
  bindRef: () => null,
};
