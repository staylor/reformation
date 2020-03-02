import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';
import responsive from 'styles/responsive';
import { h1styles } from 'styles/utils';

export const wrapperClass = css`
  margin: 0 auto;
  width: 640px;
  max-width: 100%;

  ${responsive.desktop} {
    margin: 0;
  }
`;

export const titleClass = css`
  ${h1styles};
  color: ${themeUtils.colors.dark};
`;

export const textClass = css`
  margin-bottom: 24px;
`;

export const figureClass = css`
  margin-bottom: 24px;
`;

export const figcaptionClass = css`
  margin-bottom: 12px;
`;

export const linkClass = css`
  color: ${themeUtils.colors.pink};
  display: block;
`;

export const footerClass = css`
  margin: 40px 0 0;

  ${responsive.tablet} {
    display: flex;
  }
`;

export const logoClass = css`
  margin: 0 0 10px;

  ${responsive.tablet} {
    margin: 0 10px 0 0;
  }
`;

export const appleClass = css`
  height: 50px;
  width: auto;
`;

export const googleClass = css`
  height: 50px;
  width: auto;
`;

export const spotifyClass = css`
  height: 50px;
  width: auto;
`;
