import React from 'react';
import { cx } from 'emotion';
import { withRouter } from 'react-router';
import { NavLink as RRNavLink } from 'react-router-dom';
import { linkClass, dashiconClass } from './styled';

/* eslint-disable react/prop-types */

function NavLink({ item, isCollapsed, isHovered, hasSubNav, location }) {
  return (
    <RRNavLink
      to={item.path}
      activeClassName="active"
      isActive={() => item.path === location.pathname}
      className={cx(linkClass, {
        open: !isCollapsed,
        collapsed: isCollapsed,
        hovered: isHovered,
        flyout: isHovered && hasSubNav,
      })}
    >
      {item.dashicon && (
        <i className={cx(dashiconClass, 'dashicons-before', `dashicons-${item.dashicon}`)} />
      )}
      <span>{item.label}</span>
    </RRNavLink>
  );
}

export default withRouter(NavLink);
