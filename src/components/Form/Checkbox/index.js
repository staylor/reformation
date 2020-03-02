import React, { useState } from 'react';
import { cx } from 'pretty-lights';
import { checkboxClass } from './styled';

/* eslint-disable react/prop-types */

function Checkbox({ id, className, bindRef, checked, onChange, ...props }) {
  const [isChecked, setIsChecked] = useState(checked);

  const onChangeEvent = e => {
    const value = Boolean(e.target.checked);
    setIsChecked(value);
    if (onChange) {
      onChange(value, id || null);
    }
  };

  return (
    <input
      {...props}
      ref={bindRef}
      className={cx(checkboxClass, className)}
      type="checkbox"
      onChange={onChangeEvent}
      checked={isChecked}
    />
  );
}

Checkbox.defaultProps = {
  className: null,
  checked: false,
  onChange: () => null,
  bindRef: () => null,
};

export default Checkbox;
