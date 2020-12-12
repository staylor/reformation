import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import Select from 'components/Form/Select';
import { navClass, navItemClass } from './styled';

/* eslint-disable react/prop-types */

const year = new Date().getFullYear() + 1;
const yearChoices = (start, end) => [...Array(end - start).keys()].map(i => start + i);

const isActive = (path, location) => () =>
  path === location.pathname || (path !== '/' && location.pathname.indexOf(path) === 0);

const Link = ({ to, children, exact = undefined }) => {
  const location = useLocation();
  return (
    <NavLink
      className={navItemClass}
      to={to}
      exact={exact}
      isActive={isActive(to, location)}
      activeClassName="active"
    >
      {children}
    </NavLink>
  );
};

// eslint-disable-next-line react/no-multi-comp
const Navigation = () => {
  const history = useHistory();

  const onChange = value => {
    history.push({
      pathname: `/videos/${value}`,
    });
  };
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
        onChange={onChange}
      />
    </nav>
  );
};

export default Navigation;
