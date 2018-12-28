import { css } from 'emotion';
import themeUtils from 'styles/theme';

export const tableClass = css`
  border-collapse: collapse;
  color: ${themeUtils.colors.black};
  width: 100%;

  td {
    border: 1px solid ${themeUtils.colors.detail};
    padding: 5px;
  }

  ${themeUtils.breakpoint.desktop} {
    width: 75%;
  }
`;

export const yearCellClass = css`
  font-family: ${themeUtils.fonts.futura};
  font-weight: bold;
`;

export const monthCellClass = css`
  font-family: ${themeUtils.fonts.futura};
`;

export const dateCellClass = css`
  font-family: ${themeUtils.fonts.futura};
  font-size: 14px;
  text-align: right;
  width: 50px;
`;

export const artistCellClass = css`
  font-size: 14px;
  letter-spacing: 0.3px;
  width: 200px;

  a {
    color: ${themeUtils.colors.pink};
    text-decoration: underline;
  }
`;

export const venueCellClass = css`
  font-family: ${themeUtils.fonts.futura};
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;

  a {
    text-decoration: none;
    color: ${themeUtils.colors.black};

    &:hover {
      color: ${themeUtils.colors.black};
      text-decoration: underline;
    }
  }
`;
