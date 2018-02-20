// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import type { ClassNameArg } from 'types/emotion';
import { checkboxClass } from './styled';

type Props = {
  id: string,
  className?: ClassNameArg,
  checked?: boolean,
  onChange?: (checked: boolean, id?: string | null) => void,
};

type State = {
  checked: boolean,
};

export default class Checkbox extends Component<Props, State> {
  onChange = (e: { target: HTMLInputElement }) => {
    const value = Boolean(e.target.checked);
    this.setState({ checked: value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value, this.props.id || null);
      }
    });
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      checked: Boolean(props.checked),
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!Object.keys(nextProps).includes('checked')) {
      return;
    }
    this.setState({ checked: Boolean(nextProps.checked) });
  }

  render() {
    const { id, className, checked, onChange, ...props } = this.props;

    return (
      <input
        {...props}
        className={cx(checkboxClass, className)}
        type="checkbox"
        onChange={this.onChange}
        checked={this.state.checked}
      />
    );
  }
}
