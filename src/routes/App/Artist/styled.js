import { css } from 'emotion';
import themeUtils from 'styles/theme';
import { h1styles } from 'styles/utils';

export const titleClass = css`
  ${h1styles};
  color: ${themeUtils.colors.dark};
`;

export const textClass = css`
  margin: 0 0 20px;
`;
