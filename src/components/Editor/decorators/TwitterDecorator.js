import React from 'react';
import type { ContentBlock } from 'draft-js';
import themeUtils from 'styles/theme';
import { findWithRegex } from '../utils';

/* eslint-disable react/prop-types */

const HANDLE_REGEX = /@[\w]+/g;

function handleStrategy(contentBlock: ContentBlock, callback: () => void) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

const RedraftHandle = ({ children, decoratedText }) => (
  <a
    key={decoratedText}
    target="_blank"
    rel="noopener noreferrer"
    href={`https://twitter.com/${decoratedText.substring(1)}`}
  >
    {children}
  </a>
);

export const TwitterRedraftDecorator = {
  strategy: handleStrategy,
  component: RedraftHandle,
};

// eslint-disable-next-line react/no-multi-comp
const HandleSpan = props => (
  <span style={{ color: themeUtils.colors.pink }} data-offset-key={props.offsetKey}>
    {props.children}
  </span>
);

export default {
  strategy: handleStrategy,
  component: HandleSpan,
};
