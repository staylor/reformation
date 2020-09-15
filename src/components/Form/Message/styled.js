import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';

export const messageWrapClass = css`
  background: ${themeUtils.colors.background};
  border-left: 4px solid ${themeUtils.colors.pink};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  display: block;
  margin: 5px 0 15px;
  padding: 1px 38px 1px 12px;
  position: relative;
`;

export const messageTextClass = css`
  color: ${themeUtils.colors.dark};
  font-size: 13px;
  line-height: 1.5;
  margin: 0.5em 0;
  padding: 2px;
`;

export const dismissButtonClass = css`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 9px;
  position: absolute;
  right: 1px;
  top: 0;

  &::before {
    background: none;
    color: ${themeUtils.colors.text};
    content: '\f153';
    display: block;
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font: normal 16px/20px dashicons;
    height: 20px;
    speak: none;
    text-align: center;
    width: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
