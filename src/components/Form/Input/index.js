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
  didMount = false;

  onChange = (e: { target: HTMLInputElement }) => {
    const value = e.target.value || '';
    this.setState({ value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value || '',
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.didMount || nextProps.value === this.state.value) {
      return;
    }
    this.setState({ value: nextProps.value || '' });
  }

  componentDidMount() {
    this.didMount = true;
  }

  render() {
    const { className, onChange, bindRef, value, ...props } = this.props;
    return (
      <input
        type="text"
        {...props}
        ref={bindRef}
        className={cx(inputClass, className)}
        onChange={this.onChange}
        value={this.state.value}
      />
    );
  }
}
