import { styled, css } from 'pretty-lights';
import themeUtils from 'styles/theme';
import { h1BaseClass, h2BaseClass, h3BaseClass, h4BaseClass } from 'styles/utils';

export const wrapperClass = css`
  width: 640px;
  max-width: 100%;
`;

export const Title = styled.h1`
  ${h1BaseClass};
  border-left: 6px solid ${themeUtils.colors.pink};
  color: ${themeUtils.colors.dark};
  letter-spacing: 0;
  padding-left: 10px;
`;

export const Paragraph = styled.p`
  margin-bottom: 24px;

  a {
    color: ${themeUtils.colors.pink};
  }
`;

export const Heading = styled.h2`
  ${h2BaseClass};
  color: ${themeUtils.colors.dark};
`;

export const SubHeading = styled.h3`
  ${h3BaseClass};
  color: ${themeUtils.colors.dark};
  display: inline-block;
  margin-top: 24px;
  padding: 4px 24px 4px 2px;
  border: 2px dashed ${themeUtils.colors.pink};
  border-width: 0 0 2px;
`;

export const BoldHeading = styled.h4`
  ${h4BaseClass};
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
