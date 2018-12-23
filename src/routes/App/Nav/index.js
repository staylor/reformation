import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Select from 'components/Form/Select';
import { navClass, navItemClass } from './styled';

/* eslint-disable react/prop-types */

const year = new Date().getFullYear() + 1;
const yearChoices = (start, end) => [...Array(end - start).keys()].map(i => start + i);

@withRouter
class Navigation extends Component {
  onChange = value => {
    this.props.history.push({
      pathname: `/videos/${value}`,
    });
  };

  render() {
    return (
      <nav className={navClass}>
        <Link className={navItemClass} to="/">
          Home
        </Link>
        <Link className={navItemClass} to="/videos">
          Videos
        </Link>
        <Select
          placeholder="-- BY YEAR --"
          choices={yearChoices(2001, year).reverse()}
          onChange={this.onChange}
        />
      </nav>
    );
  }
}

export default Navigation;
