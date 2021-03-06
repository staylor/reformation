import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';
import responsive from 'styles/responsive';
import { headingBaseClass } from 'styles/utils';

export const headingClass = css`
  ${headingBaseClass};
  color: ${themeUtils.colors.dark};
  font-family: ${themeUtils.fonts.futura};
  font-size: 25px;
`;

export const showsClass = css`
  ${responsive.tablet} {
    column-count: 3;
  }

  ${responsive.desktop} {
    column-count: 1;
  }
`;

export const showClass = css`
  font-size: 15px;
  margin: 0 0 10px 10px;
`;

export const timeClass = css`
  display: block;
  font-size: 14px;
  font-weight: ${themeUtils.fonts.weight.bold};
`;
