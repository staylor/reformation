import { styled, css } from 'pretty-lights';
import themeUtils from 'styles/theme';
import { h1Class, h2Class, h3Class, h4Class } from 'styles/utils';

export const wrapperClass = css`
  width: 640px;
  max-width: 100%;
`;

export const Title = styled.h1`
  ${h1Class};
  color: ${themeUtils.colors.dark};
`;

export const Paragraph = styled.p`
  margin-bottom: 24px;

  a {
    color: ${themeUtils.colors.pink};
  }
`;

export const Heading = styled.h2`
  ${h2Class};
  color: ${themeUtils.colors.dark};
`;

export const SubHeading = styled.h3`
  ${h3Class};
  color: ${themeUtils.colors.dark};
`;

export const BoldHeading = styled.h4`
  ${h4Class};
  color: ${themeUtils.colors.dark};
`;

export const embedClass = css`
  margin: 20px 0;
`;

export const listClass = css`
  list-style-type: disc;
  margin: 20px 0 20px 32px;
`;

export const orderedListClass = css`
  list-style-type: decimal;
  margin: 20px 0 20px 32px;
`;

export const imageClass = css`
  display: block;
  height: auto;
  margin: 10px 0;
  max-width: 100%;
`;
