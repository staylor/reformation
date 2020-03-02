import { styled, css } from 'pretty-lights';
import facepaint from 'facepaint';
import themeUtils from 'styles/theme';
import responsive from 'styles/responsive';

export const baseHeadingClass = css`
  display: block;
  font-weight: ${themeUtils.fonts.weight.bold};
  letter-spacing: 0.3px;
  line-height: 1.3;
  margin-bottom: 10px;

  ${responsive.desktop} {
    margin-bottom: ${themeUtils.padding}px;
  }
`;

export const h1Class = css`
  ${baseHeadingClass};
  font-size: 30px;

  ${responsive.desktop} {
    font-size: 36px;
  }
`;

export const h2Class = css`
  ${baseHeadingClass};
  font-family: ${themeUtils.fonts.futura};
  font-size: 24px;
`;

export const h3Class = css`
  ${baseHeadingClass};
  font-family: ${themeUtils.fonts.futura};
  font-size: 20px;
`;

export const h4Class = css`
  ${baseHeadingClass};
  font-family: ${themeUtils.fonts.futura};
  font-size: 18px;
`;

export const Heading = styled.h2`
  ${baseHeadingClass};
  color: ${themeUtils.colors.black};
  font-family: ${themeUtils.fonts.futura};
  font-size: 25px;
`;

export const LoadMore = styled.button`
  appearance: none;
  background: ${themeUtils.colors.white};
  border: 1px solid ${themeUtils.colors.detail};
  box-sizing: border-box;
  color: ${themeUtils.colors.inactive};
  cursor: pointer;
  font-size: 16px;
  height: 32px;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  transition: 400ms;
  width: 80px;

  &:hover,
  &:active,
  &:focus {
    border: 1px solid ${themeUtils.colors.black};
    color: ${themeUtils.colors.black};
    outline: 0 none;
  }
`;

export const baseButtonClass = css`
  appearance: none;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  height: 28px;
  line-height: 26px;
  margin: 0;
  outline: 0;
  padding: 0 10px 1px;
  text-decoration: none;
  transition-duration: 0.05s;
  transition-property: border, background, color;
  transition-timing-function: ease-in-out;
  vertical-align: top;
  white-space: nowrap;

  &:active {
    transform: translateY(1px);
  }
`;

const pseudo = facepaint([':active', ':focus', ':hover']);

const generateButtonColors = c =>
  css(
    pseudo({
      background: [c.background, c.active.background, c.focus.background, c.hover.background],
      borderColor: [c.border, c.active.border, c.focus.border, c.hover.border],
      boxShadow: [c.boxShadow, c.active.boxShadow, c.focus.boxShadow],
      color: [c.color, null, c.focus.color, c.hover.color],
    })
  );

export const buttonColors = generateButtonColors(themeUtils.buttons.base);

export const Button = styled.button`
  ${baseButtonClass};
  ${buttonColors};
`;

export const largeButtonClass = css`
  ${baseButtonClass};
  height: 30px;
  line-height: 28px;
  padding: 0 12px 2px;
`;

const primaryButtonColors = generateButtonColors(themeUtils.buttons.primary);

export const PrimaryButton = styled.button`
  ${largeButtonClass};
  ${primaryButtonColors};
  text-shadow: ${themeUtils.buttons.primary.textShadow};
`;

export const smallButtonClass = css`
  ${baseButtonClass};
  font-size: 11px;
  height: 24px;
  line-height: 22px;
  padding: 0 8px 1px;
`;

export const SecondaryButton = styled.button`
  ${smallButtonClass};
  ${buttonColors};
`;
