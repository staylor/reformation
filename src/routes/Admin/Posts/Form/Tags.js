import React, { Component } from 'react';
import Input from 'components/Form/Input';
import { tagWrapClass, tagClass, DeleteTag } from './styled';

/* eslint-disable react/prop-types */

export default class Tags extends Component {
  state = {
    pending: this.props.tags || [],
  };

  onKeyDown = e => {
    if (e.which === 13) {
      const pending = [...this.state.pending];
      pending.push(e.target.value);
      const unique = [...new Set(pending)];
      this.props.onChange(unique);
      this.setState({ pending: unique });
    }
  };

  bindClick = tag => e => {
    e.preventDefault();

    this.setState(({ pending: statePending }) => {
      const pending = [...statePending];
      pending.splice(pending.indexOf(tag), 1);
      this.props.onChange(pending);
      return { pending };
    });
  };

  render() {
    return (
      <>
        <Input
          placeholder="Type tag then press ENTER"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        <div className={tagWrapClass}>
          {this.state.pending.map(tag => (
            <div className={tagClass} key={tag}>
              <DeleteTag onClick={this.bindClick(tag)} /> {tag}
            </div>
          ))}
        </div>
      </>
    );
  }
}
