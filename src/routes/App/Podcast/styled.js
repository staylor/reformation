import styled from 'react-emotion';
import themeUtils from 'styles/theme';
import { h1styles } from 'styles/utils';

export const Wrapper = styled.article`
  width: 640px;
  max-width: 100%;
`;

export const Title = styled.h1`
  ${h1styles};
  color: ${themeUtils.colors.dark};
`;
