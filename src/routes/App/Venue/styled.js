import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';
import { h1Class } from 'styles/utils';

export const titleClass = css`
  ${h1Class};
  color: ${themeUtils.colors.dark};
`;

export const textClass = css`
  margin: 0 0 20px;
`;
