import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Select from 'components/Form/Select';
import { navClass, navItemClass } from './styled';

/* eslint-disable react/prop-types */

const year = new Date().getFullYear() + 1;
const yearChoices = (start, end) => [...Array(end - start).keys()].map(i => start + i);

const isActive = (path, location) => () =>
  path === location.pathname || (path !== '/' && location.pathname.indexOf(path) === 0);

const Link = withRouter(({ to, location, children, exact = undefined }) => (
  <NavLink
    className={navItemClass}
    to={to}
    exact={exact}
    isActive={isActive(to, location)}
    activeClassName="active"
  >
    {children}
  </NavLink>
));

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
        <Link to="/" exact>
          Home
        </Link>
        <Link to="/podcast" exact>
          Podcast
        </Link>
        <Link to="/shows">Shows</Link>
        <Link to="/videos">Videos</Link>
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
