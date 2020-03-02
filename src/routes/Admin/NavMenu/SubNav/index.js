import React from 'react';
import { cx } from 'emotion';
import { withRouter, NavLink } from 'react-router-dom';

import { subNavClass, subNavLinkClass } from './styled';

/* eslint-disable react/prop-types */

function SubNav({ isHovered, isCollapsed, location, item }) {
  const active = location.pathname.indexOf(item.path) === 0;
  return (
    <nav
      className={cx(subNavClass, {
        active,
        collapsed: isCollapsed,
        hovered: isHovered,
        flyout: (isCollapsed || !active) && isHovered,
      })}
    >
      {item.routes.map(route => (
        <NavLink
          className={subNavLinkClass}
          key={route.path}
          to={route.path}
          exact
          isActive={() => route.path === location.pathname}
          activeClassName="active"
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default withRouter(SubNav);
