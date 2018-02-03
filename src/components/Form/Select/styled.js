import { css } from 'emotion';
import inputStyles from 'components/Form/styled';

// eslint-disable-next-line
export const selectClass = css`
  ${inputStyles};
  height: 28px;
  line-height: 28px;
  margin: 1px;
  max-width: 200px;
  padding: 2px;
  vertical-align: middle;

  &[multiple] {
    display: block;
    height: auto;
    width: 100%;
  }
`;
