import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';
import responsive from 'styles/responsive';

export const wrapClass = css`
  display: flex;
  flex-direction: column-reverse;

  ${responsive.tablet} {
    flex-direction: row;
    margin: 0 auto;
    width: 730px;
  }

  ${responsive.desktop} {
    margin: 0;
    width: auto;
  }
`;

export const videosClass = css`
  border-top: 1px solid ${themeUtils.colors.detail};
  margin: ${themeUtils.padding * 2}px auto 0;
  padding-top: ${themeUtils.padding}px;

  ${responsive.tablet} {
    border: 0 none;
    margin: 0;
    padding: 0;
    width: 480px;
  }
`;
