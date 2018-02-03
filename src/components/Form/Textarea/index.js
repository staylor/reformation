// @flow
import React, { Component } from 'react';
import { textareaClass } from './styled';

type Props = {
  value: string,
  onChange?: string => void,
};

type State = {
  value: string,
};

export default class Textarea extends Component<Props, State> {
  didMount = false;

  onChange = (e: { target: HTMLTextAreaElement }) => {
    const value = e.target.value || '';
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.setState({ value });
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
    return (
      <textarea
        {...this.props}
        className={textareaClass}
        onChange={this.onChange}
        value={this.state.value}
      />
    );
  }
}
