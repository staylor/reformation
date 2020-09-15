import React, { Component } from 'react';
import { cx } from 'pretty-lights';
import { textareaClass } from './styled';

/* eslint-disable react/prop-types */

// type Props = {
//   value: string,
//   className?: string | null,
//   onChange?: (value: string) => void,
//   bindRef?: (element: any) => void,
// };

export default class Textarea extends Component {
  onChange = e => {
    const value = e.target.value || '';
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const { className, onChange, value, bindRef, ...props } = this.props;
    return (
      <textarea
        {...props}
        ref={bindRef}
        className={cx(textareaClass, className)}
        onChange={this.onChange}
        defaultValue={value}
      />
    );
  }
}

Textarea.defaultProps = {
  className: null,
  onChange: () => null,
  bindRef: () => null,
};
