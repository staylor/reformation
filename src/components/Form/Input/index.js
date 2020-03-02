import React, { Component } from 'react';
import { cx } from 'pretty-lights';
import { inputClass } from './styled';

/* eslint-disable react/prop-types */

export default class Input extends Component {
  state = {
    value: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value === prevState.value) {
      return null;
    }
    return { value: nextProps.value || '' };
  }

  onChange = e => {
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
