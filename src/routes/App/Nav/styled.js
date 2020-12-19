import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';
import responsive from 'styles/responsive';

export const navClass = css`
  margin: 10px auto ${themeUtils.padding}px;
  text-align: center;

  ${responsive.tablet} {
    display: flex;
    justify-content: flex-start;
    margin: ${themeUtils.padding}px auto;
    width: 545px;
  }

  ${responsive.desktop} {
    margin: 0 0 ${themeUtils.padding}px;
    text-align: left;
    width: auto;
  }
`;

export const navItemClass = css`
  color: ${themeUtils.colors.text};
  display: inline-block;
  font-family: ${themeUtils.fonts.futura};
  font-size: 28px;
  font-weight: ${themeUtils.fonts.weight.bold};
  line-height: 28px;
  margin: 2px 10px;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;

  &.active {
    color: ${themeUtils.colors.pink};
  }

  ${responsive.tablet} {
    font-size: 24px;
    line-height: 28px;
    margin: 0 20px 0 0;
  }
`;

export const selectClass = css`
  margin: 0 auto;

  ${responsive.tablet} {
    margin: 0;
  }
`;
