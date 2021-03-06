import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';

const mediumQuery = `@media screen and (max-width: ${themeUtils.breakpoint.medium}px)`;

const flyoutClass = css`
  background-color: ${themeUtils.colors.dark};
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  display: block;
  min-width: ${themeUtils.menuWidth.open}px;
  position: absolute;
  top: -1px;
  width: auto;
  z-index: 100000;
`;

export const subNavClass = css`
  background-color: ${themeUtils.colors.white};
  display: none;
  left: ${themeUtils.menuWidth.open}px;
  padding: 7px 0 8px;

  &.active {
    display: block;

    ${mediumQuery} {
      display: none;
    }
  }

  &.collapsed {
    display: none;
    left: ${themeUtils.menuWidth.collapsed}px;
  }

  ${mediumQuery} {
    display: none;
    left: ${themeUtils.menuWidth.collapsed}px;
  }

  &.flyout {
    ${flyoutClass};
  }

  &.hovered {
    ${mediumQuery} {
      ${flyoutClass};
    }
  }
`;

export const subNavLinkClass = css`
  color: ${themeUtils.colors.dark};
  display: block;
  font-size: 13px;
  letter-spacing: 0.3px;
  line-height: 1.2;
  padding: 6px 12px;
  text-decoration: none;

  &:hover,
  &:active {
    color: ${themeUtils.colors.pink};
  }

  &.active {
    color: ${themeUtils.colors.black};
    font-weight: ${themeUtils.fonts.weight.bold};

    &:hover,
    &:active {
      color: ${themeUtils.colors.black};
    }
  }

  .flyout & {
    color: ${themeUtils.colors.white};

    &:visited,
    &:link {
      color: ${themeUtils.colors.white};
    }

    &:hover,
    &:active {
      color: ${themeUtils.colors.pink};
    }

    &.active {
      &:hover,
      &:active {
        color: ${themeUtils.colors.pink};
      }
    }
  }
`;
