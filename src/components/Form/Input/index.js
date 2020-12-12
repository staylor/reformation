import React, { useState } from 'react';
import { cx } from 'pretty-lights';
import { inputClass } from './styled';

/* eslint-disable react/prop-types */

// type Props = {
//   value: string,
//   className?: string | null,
//   onChange?: (value: string) => void,
//   bindRef?: (element: any) => void,
// };
//
// type State = {
//   value: string,
// };

export default function Input({ value, onChange, className, bindRef, ...props }) {
  const [inputValue, setValue] = useState(value || '');

  const inputOnChange = e => {
    const newValue = e.target.value || '';
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="text"
      // eslint-disable-next-line
      {...props}
      ref={bindRef}
      className={cx(inputClass, className)}
      onChange={inputOnChange}
      defaultValue={inputValue}
    />
  );
}

Input.defaultProps = {
  className: undefined,
  onChange: () => null,
  bindRef: () => null,
};
