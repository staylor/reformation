import React, { Component } from 'react';
import { cx } from 'pretty-lights';
import { checkboxClass } from './styled';

/* eslint-disable react/prop-types */

// type Props = {
//   id: string,
//   className?: string | null,
//   checked?: boolean,
//   onChange?: (checked: boolean, id?: string | null) => void,
//   bindRef?: (element: any) => void,
// };
//
// type State = {
//   checked: boolean,
// };

export default class Checkbox extends Component {
  state = {
    checked: false,
  };

  static getDerivedStateFromProps(nextProps) {
    if (Object.keys(nextProps).includes('checked')) {
      return { checked: Boolean(nextProps.checked) };
    }
    return null;
  }

  onChange = e => {
    const value = Boolean(e.target.checked);
    this.setState({ checked: value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value, this.props.id || null);
      }
    });
  };

  render() {
    const { id, className, checked, onChange, bindRef, ...props } = this.props;

    return (
      <input
        // eslint-disable-next-line
        {...props}
        ref={bindRef}
        className={cx(checkboxClass, className)}
        type="checkbox"
        onChange={this.onChange}
        checked={this.state.checked}
      />
    );
  }
}

Checkbox.defaultProps = {
  className: undefined,
  checked: false,
  onChange: () => null,
  bindRef: () => null,
};
