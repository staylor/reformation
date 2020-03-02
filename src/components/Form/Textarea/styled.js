import { css } from 'pretty-lights';
import { inputBaseClass } from 'components/Form/styled';

// eslint-disable-next-line
export const textareaClass = css`
  ${inputBaseClass};
  display: block;
  height: 80px;
  padding: 2px 6px;
  resize: vertical;
  width: 100%;
`;
