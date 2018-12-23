// @flow
import React, { Component, type Node } from 'react';
import { cx } from 'emotion';
import { selectClass } from 'components/Form/styled';

export type Choice = string | number | { label: string, value: string | number };
export type Choices = Array<Choice>;
export type Groups = Array<{ label: string, choices: Choices }>;

type Props = {
  className?: string | null,
  multiple?: boolean,
  onChange?: (value: any) => any,
  bindRef?: (element: any) => void,
  value?: string | number | Array<string | number> | null,
  placeholder?: string,
  choices?: Choices,
  groups?: Groups,
  children?: Node,
};

type State = {
  value: any,
};

const renderOption = (choice: Choice): Node => {
  if (typeof choice === 'object') {
    return (
      <option key={choice.value} value={choice.value}>
        {choice.label}
      </option>
    );
  }
  return (
    <option key={choice} value={choice}>
      {choice}
    </option>
  );
};

export default class Select extends Component<Props, State> {
  onChange = (e: { target: HTMLSelectElement }) => {
    let { value } = e.target;
    const multiple = Boolean(this.props.multiple);
    if (multiple) {
      value = [...e.target.selectedOptions].map(o => o.value);
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const {
      className,
      placeholder,
      multiple,
      choices,
      groups,
      children,
      value,
      onChange,
      bindRef,
      ...rest
    } = this.props;

    return (
      <select
        {...rest}
        ref={bindRef}
        multiple={multiple ? Boolean(multiple) : false}
        className={cx(selectClass, className)}
        defaultValue={value}
        onChange={this.onChange}
      >
        {placeholder && (
          <option key={placeholder} value="">
            {placeholder}
          </option>
        )}
        {groups &&
          groups.map(group => (
            <optgroup key={group.label} label={group.label}>
              {group.choices.map(renderOption)}
            </optgroup>
          ))}
        {choices && choices.map(renderOption)}
        {children}
      </select>
    );
  }
}

Select.defaultProps = {
  className: null,
  multiple: false,
  onChange: () => null,
  bindRef: () => null,
  value: null,
  placeholder: null,
  choices: null,
  groups: null,
  children: null,
};
