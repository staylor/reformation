import React, { useState } from 'react';
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

export default function Checkbox({ checked, onChange, id, className, bindRef, ...props }) {
  const [isChecked, setChecked] = useState(checked ? Boolean(checked) : false);

  const inputOnChange = e => {
    const value = Boolean(e.target.checked);
    setChecked(value);
    if (onChange) {
      onChange(value, id || null);
    }
  };

  return (
    <input
      // eslint-disable-next-line
      {...props}
      ref={bindRef}
      className={cx(checkboxClass, className)}
      type="checkbox"
      onChange={inputOnChange}
      checked={isChecked}
    />
  );
}

Checkbox.defaultProps = {
  className: undefined,
  checked: false,
  onChange: () => null,
  bindRef: () => null,
};
