import { css } from 'emotion';
import themeUtils from 'styles/theme';

export const noItemsClass = css`
  margin: 40px 0;
`;

export const rowActionsClass = css`
  font-size: 13px;

  a {
    color: ${themeUtils.colors.text};
    text-decoration: none;

    &.delete {
      color: ${themeUtils.colors.pink};
    }
  }
`;

export const rowTitleClass = css`
  display: block;
  font-size: 14px;
  font-weight: ${themeUtils.fonts.weight.bold};
  margin-bottom: 0.2em;
  word-wrap: break-word;

  & a {
    text-decoration: none;
  }

  & span {
    font-size: 13px;
    font-weight: normal;
  }
`;

export const searchBoxClass = css`
  float: right;
`;

export const filtersClass = css`
  margin: 6px 0;
  overflow: hidden;
`;

export const paginationClass = css`
  float: right;
  font-size: 13px;
  user-select: none;

  strong {
    display: inline-block;
    font-weight: normal;
    margin: 0 3px;
    min-width: 65px;
    text-align: center;
    user-select: none;
  }

  span,
  a {
    display: inline-block;
    font-size: 16px;
    font-weight: normal;
    height: 16px;
    line-height: 1;
    margin: 0 2px;
    min-width: 17px;
    padding: 3px 5px 7px;
    text-align: center;
    user-select: none;
  }

  span {
    border: 1px solid ${themeUtils.colors.detail};
    background: ${themeUtils.colors.background};
  }

  a {
    border: 1px solid ${themeUtils.colors.detail};
    background: ${themeUtils.colors.white};
    color: ${themeUtils.colors.dark};
    text-decoration: none;

    &:hover {
      color: ${themeUtils.colors.black};
    }
  }
`;

export const tableClass = css`
  border: 1px solid ${themeUtils.colors.detail};
  border-spacing: 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  table-layout: fixed;
  width: 100%;
`;

export const cellClass = css`
  font-size: 13px;
  line-height: 1.5;
  padding: 8px 10px;
  vertical-align: top;
  word-wrap: break-word;
`;

export const cellHeadingClass = css`
  font-size: 14px;
  line-height: 1.4;
  padding: 8px 10px;
  text-align: left;

  thead & {
    border-bottom: 1px solid ${themeUtils.colors.detail};
  }

  tfoot & {
    border-top: 1px solid ${themeUtils.colors.detail};
  }
`;

export const checkboxCellClass = css`
  width: 2.2em;

  tbody & {
    padding: 6px 10px;
    vertical-align: top;

    input {
      vertical-align: text-top;
    }
  }

  thead & {
    border-bottom: 1px solid ${themeUtils.colors.detail};
  }

  tfoot & {
    border-top: 1px solid ${themeUtils.colors.detail};
  }
`;

export const stripedRowClass = css`
  tbody &:nth-of-type(even) {
    background: ${themeUtils.colors.background};
  }
`;

export const thumbnailColumnClass = css`
  width: 62px;
`;

export const thumbnailClass = css`
  display: block;
  height: auto;
  ${thumbnailColumnClass};
`;
