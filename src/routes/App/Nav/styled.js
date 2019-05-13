import { css } from 'emotion';
import themeUtils from 'styles/theme';
import responsive from 'styles/responsive';

export const navClass = css`
  margin: ${themeUtils.padding}px 0;

  ${responsive.tablet} {
    display: flex;
    justify-content: flex-start;
    margin: ${themeUtils.padding}px auto;
    text-align: center;
    width: 640px;
  }

  ${responsive.desktop} {
    margin: ${themeUtils.padding}px 0;
    text-align: left;
    width: auto;
  }
`;

export const navItemClass = css`
  color: ${themeUtils.colors.dark};
  font-family: ${themeUtils.fonts.futura};
  font-size: 18px;
  font-weight: ${themeUtils.fonts.weight.bold};
  line-height: 28px;
  margin: 0 20px 0 0;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;

  &.active {
    color: ${themeUtils.colors.pink};
  }

  ${responsive.tablet} {
    font-size: 24px;
  }
`;
