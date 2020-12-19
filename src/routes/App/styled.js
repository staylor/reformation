import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';
import responsive from 'styles/responsive';

export const wrapperClass = css`
  background: ${themeUtils.colors.white};
  margin: 0 auto;
  max-width: ${themeUtils.contentWidth}px;
  padding: 20px;

  ${responsive.desktop} {
    margin: 20px auto;
  }
`;

export const headerClass = css`
  position: relative;

  ${responsive.tablet} {
    margin-bottom: ${themeUtils.padding}px;
  }
`;

export const titleClass = css`
  display: block;
  font-family: ${themeUtils.fonts.futura};
  font-size: 36px;
  font-weight: bold;
  line-height: 36px;
  margin: 0;
  text-align: center;
  text-transform: uppercase;

  ${responsive.tablet} {
    font-size: 84px;
    line-height: 92px;
  }

  ${responsive.desktop} {
    text-align: left;
  }

  a {
    text-decoration: none;
  }

  svg {
    display: block;
    height: auto;
    margin: 0 auto;
    max-width: 615px;
    width: 100%;

    ${responsive.desktop} {
      height: 54px;
      margin: 0;
      width: auto;
    }
  }
`;

export const contentClass = css`
  ${responsive.desktop} {
    display: flex;
    padding: ${themeUtils.padding}px;
  }
`;

export const primaryClass = css`
  margin-bottom: ${themeUtils.padding}px;
  max-width: 100%;

  ${responsive.desktop} {
    flex: 4;
    margin-right: ${themeUtils.padding}px;
  }
`;

export const secondaryClass = css`
  border-top: 1px solid ${themeUtils.colors.detail};
  display: block;
  margin: ${themeUtils.padding * 3}px auto 0;
  max-width: 100%;
  padding-top: ${themeUtils.padding}px;
  width: 640px;

  ${responsive.desktop} {
    border: 0;
    margin: 0;
    padding: 0;
    width: 220px;
  }
`;

export const footerClass = css`
  font-size: 14px;
  overflow: hidden;
  text-align: center;
`;

export const socialNavClass = css`
  margin: 20px 0 0;
  text-align: center;

  ${responsive.tablet} {
    margin: 0;
  }

  ${responsive.desktop} {
    position: absolute;
    right: 0;
    top: 13px;
  }
`;

const socialIconClass = css`
  color: ${themeUtils.colors.dark};
  display: inline-block;
  font-size: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  text-decoration: none;
  width: 35px;

  ${responsive.tablet} {
    font-size: 28px;
    height: 28px;
    line-height: 28px;
    width: 65px;
  }

  &:hover {
    color: ${themeUtils.colors.pink};
  }

  span {
    display: none;
  }
`;

export const facebookIconClass = css`
  ${socialIconClass};
  width: 22px;

  ${responsive.desktop} {
    width: 45px;
  }

  &::before {
    content: '\\e605';
  }
`;

export const twitterIconClass = css`
  ${socialIconClass};

  &::before {
    content: '\\ea91';
  }
`;

export const instagramIconClass = css`
  ${socialIconClass};

  &::before {
    content: '\\e603';
  }
`;

export const youtubeIconClass = css`
  ${socialIconClass};

  &::before {
    content: '\\e604';
  }
`;

export const footerNavClass = css`
  margin: 10px 0;
  text-align: center;
`;

export const mailchimpClass = css`
  ${responsive.tablet} {
    margin: 0 auto;
    width: 320px;
  }

  ${responsive.desktop} {
    width: auto;
  }
`;
