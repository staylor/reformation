import { css } from 'emotion';
import themeUtils from 'styles/theme';

const mediumQuery = `@media screen and (max-width: ${themeUtils.breakpoint.medium}px)`;

export const linkClass = css`
  box-sizing: border-box;
  color: ${themeUtils.colors.text};
  display: block;
  font-size: 14px;
  line-height: 18px;
  min-height: 34px;
  padding: 8px 0;
  position: relative;
  text-decoration: none;
  z-index: 3;

  &.hovered {
    background-color: ${themeUtils.colors.white};
    color: ${themeUtils.colors.black};
  }

  &:hover {
    color: ${themeUtils.colors.black};
  }

  &.active {
    background-color: ${themeUtils.colors.dark};
    color: ${themeUtils.colors.white};

    &:visited,
    &:link,
    &:active,
    &:hover {
      background-color: ${themeUtils.colors.dark};
      color: ${themeUtils.colors.white};
    }
  }

  span {
    ${mediumQuery} {
      display: none;
    }
  }

  &.collapsed span {
    display: none;
  }

  &::after {
    content: ' ';
    height: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    z-index: 10000;

    ${mediumQuery} {
      border: 4px solid transparent;
      margin: -4px 0 0;
    }
  }

  &.open::after {
    border: 8px solid transparent;
    margin: -8px 0 0;
  }

  &.collapsed::after {
    border: 4px solid transparent;
    margin: -4px 0 0;
  }

  &.active::after {
    border-right-color: ${themeUtils.colors.white};
  }

  &.flyout {
    &::after {
      border-right-color: ${themeUtils.colors.dark};
    }

    &.active::after {
      border-right-color: ${themeUtils.colors.white};
    }

    &.active.collapsed::after {
      border-right-color: ${themeUtils.colors.dark};
    }
  }
`;

export const dashiconClass = css`
  display: block;
  float: left;
  height: 34px;
  text-align: center;
  width: 36px;

  .active & {
    color: ${themeUtils.colors.white};
  }
`;
