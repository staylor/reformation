// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import type { ClassNameArg } from 'types/emotion';
import { textareaClass } from './styled';

type Props = {
  value: string,
  className?: ClassNameArg,
  onChange?: (value: string) => void,
  bindRef?: (element: any) => void,
};

type State = {
  value: string,
};

export default class Textarea extends Component<Props, State> {
  didMount = false;

  onChange = (e: { target: HTMLTextAreaElement }) => {
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
