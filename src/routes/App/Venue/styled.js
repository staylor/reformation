import styled from 'react-emotion';
import themeUtils from 'styles/theme';
import { h1styles } from 'styles/utils';

// eslint-disable-next-line
export const Title = styled.h1`
  ${h1styles};
  color: ${themeUtils.colors.dark};
`;
