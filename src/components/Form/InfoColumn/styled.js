import { css } from 'pretty-lights';
import themeUtils from 'styles/theme';

export const infoColumnClass = css`
  float: right;
  line-height: 1.4;
  margin: 10px -300px 0 0;
  position: sticky;
  top: 10px;
  width: 280px;

  @media screen and (max-width: 782px) {
    float: none;
    margin-right: 0;
    width: 100%;
  }
`;

export const infoBoxClass = css`
  border: 1px solid ${themeUtils.colors.detail};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  display: block;
  margin: 0 0 20px;
`;

export const infoBoxHeaderClass = css`
  border-bottom: 1px solid ${themeUtils.colors.detail};
  color: ${themeUtils.colors.dark};
  font-size: 14px;
  font-weight: ${themeUtils.fonts.weight.bold};
  padding: 8px 12px;
  user-select: none;
`;

export const infoBoxContentClass = css`
  font-size: 13px;
  padding: 6px 10px 20px;
`;
