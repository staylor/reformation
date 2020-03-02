import { css } from 'pretty-lights';
import { inputStyles } from 'components/Form/styled';
import themeUtils from 'styles/theme';

// eslint-disable-next-line
export const inputClass = css`
  ${inputStyles};
  display: block;
  height: 32px;
  padding: 3px 5px;
  width: 100%;

  &::placeholder {
    color: ${themeUtils.colors.detail};
  }
`;
