import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';

// eslint-disable-next-line
export const checkboxClass = css`
  appearance: none;
  background-color: ${themeUtils.colors.white};
  border: 1px solid ${themeUtils.colors.form.checkbox.border};
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  color: ${themeUtils.colors.text};
  cursor: pointer;
  display: inline-block;
  height: 16px;
  line-height: 0;
  min-width: 16px;
  outline: 0;
  padding: 0;
  transition: 0.05s border-color ease-in-out;
  vertical-align: text-top;
  width: 16px;

  &:checked {
    &::before {
      color: ${themeUtils.colors.pink};
      content: '\f147';
      float: left;
      display: inline-block;
      /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
      font: normal 21px/1 dashicons;
      margin: -3px 0 0 -4px;
      speak: none;
      vertical-align: middle;
      width: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
`;
