import styled from 'react-emotion';
import { css } from 'emotion';
import themeUtils from 'styles/theme';

export const fieldsClass = css`
  display: block;
  float: left;
  max-width: 640px;
  width: 100%;

  @media screen and (max-width: 782px) {
    float: none;
  }
`;

export const fieldClass = css`
  display: block;
  margin: 10px 0 20px;
`;

export const wrapClass = css`
  display: block;
  margin: ${themeUtils.padding}px 0;
`;

export const FieldName = styled.span`
  display: block;
  font-size: 14px;
  letter-spacing: 0.2px;
  line-height: 1.3;
  margin: 0 0 5px;
`;

export const inputStyles = css`
  background-color: #fff;
  border: 1px solid ${themeUtils.colors.detail};
  border-radius: 0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.07);
  box-sizing: border-box;
  color: #32373c;
  font-size: 14px;
  outline: none;
  transition: 0.05s border-color ease-in-out;
`;

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

export const FieldInput = styled.input`
  ${inputStyles};
  display: block;
  height: 32px;
  padding: 3px 5px;
  width: 100%;

  &::placeholder {
    color: ${themeUtils.colors.detail};
  }
`;

export const SizedInput = styled.input`
  ${inputStyles};
  display: block;
  height: 32px;
  padding: 3px 5px;
`;

export const fieldNumberClass = css`
  display: inline-block;
  height: 32px;
  padding: 3px 5px;
  width: 64px;
`;

export const FieldValue = styled.span`
  display: block;
  font-size: 14px;
  line-height: 1.4;
`;
