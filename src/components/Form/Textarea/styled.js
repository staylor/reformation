import { css } from 'pretty-lights';
import { inputStyles } from 'components/Form/styled';

// eslint-disable-next-line
export const textareaClass = css`
  ${inputStyles};
  display: block;
  height: 80px;
  padding: 2px 6px;
  resize: vertical;
  width: 100%;
`;
