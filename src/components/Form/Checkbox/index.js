// @flow
import React, { Component } from 'react';
import { checkboxClass } from './styled';

type Props = {
  id: string,
  checked: boolean,
  onChange: (checked: boolean, id?: string | null) => void,
};

type State = {
  checked: boolean,
};

export default class Checkbox extends Component<Props, State> {
  onChange = (e: { target: HTMLInputElement }) => {
    const { checked } = e.target;
    if (this.props.onChange) {
      this.props.onChange(checked, this.props.id || null);
    }
    this.setState({ checked: Boolean(checked) });
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
    const { id, ...rest } = this.props;

    return (
      <input
        {...rest}
        className={checkboxClass}
        type="checkbox"
        onChange={this.onChange}
        checked={this.state.checked}
      />
    );
  }
}
