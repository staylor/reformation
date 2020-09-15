import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';
import responsive from 'styles/responsive';

export const wrapClass = css`
  ${responsive.tablet} {
    float: left;
    margin-right: 20px;
    width: 230px;
  }

  @media only screen and (min-width: 1050px) {
    width: 274px;
  }

  @media only screen and (min-width: 1090px) {
    margin-right: ${themeUtils.padding * 2}px;
    width: 300px;
  }
`;

export const articleClass = css`
  margin: 0 0 ${themeUtils.padding}px;

  &::after {
    clear: both;
    content: ' ';
    display: table;
  }
`;

export const titleClass = css`
  font-family: ${themeUtils.fonts.futura};
  font-size: 20px;
  line-height: 1.4;
  margin: 0 0 ${themeUtils.padding}px;

  & a {
    color: ${themeUtils.colors.dark};
    text-decoration: none;
  }
`;

export const paragraphClass = css`
  margin-bottom: 24px;
`;

export const imageClass = css`
  display: block;
  height: auto;
  margin: 0 0 15px;
  max-width: 100%;
  width: 280px;

  @media only screen and (min-width: 480px) {
    float: left;
    margin: 0 20px 10px 0;
    width: 150px;
  }

  @media only screen and (min-width: 630px) {
    width: 250px;
  }

  @media only screen and (min-width: 720px) {
    width: 300px;
  }

  ${responsive.tablet} {
    float: none;
    margin: 10px 0;
  }
`;
