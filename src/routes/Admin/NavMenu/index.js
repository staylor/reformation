import React, { Component, Fragment } from 'react';
import { cx } from 'emotion';
import NavLink from './NavLink';
import SubNav from './SubNav';
import CollapseButton from './CollapseButton';
import * as styles from './styled';

/* eslint-disable react/prop-types */

class NavMenu extends Component {
  state = {
    active: '',
  };

  onClick = e => {
    e.preventDefault();

    this.props.toggleCollapse();
  };

  mouseEnter = key => {
    this.setState({ active: key });
  };

  mouseLeave = () => {
    this.setState({ active: '' });
  };

  render() {
    const { routeConfig, isCollapsed } = this.props;

    return (
      <nav
        className={cx(styles.navClass, {
          [styles.openClass]: !isCollapsed,
          [styles.collapsedClass]: isCollapsed,
        })}
      >
        {routeConfig.map((items, i) => (
          <Fragment key={i.toString(16)}>
            {i > 0 && <i className={styles.separatorClass} />}
            {items.map((item, j) => {
              const key = `${i}-${j}`;
              const active = this.state.active === key;
              const hasSubNav = item.routes && item.routes.length > 0;
              return (
                <div
                  key={key}
                  className={styles.navWrapClass}
                  onMouseEnter={() => this.mouseEnter(key)}
                  onMouseLeave={this.mouseLeave}
                >
                  <Fragment>
                    <NavLink {...{ item, isHovered: active, hasSubNav, isCollapsed }} />
                    {item.routes && <SubNav {...{ item, isHovered: active, isCollapsed }} />}
                  </Fragment>
                </div>
              );
            })}
          </Fragment>
        ))}
        <i className={styles.separatorClass} />
        <CollapseButton onClick={this.onClick} isCollapsed={isCollapsed} />
      </nav>
    );
  }
}

export default NavMenu;
