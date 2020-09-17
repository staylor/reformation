import React from 'react';
import { linkClass } from '../styled';

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    if (!entityKey) {
      return false;
    }
    return contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

/* eslint-disable react/prop-types */

// type Props = {
//   contentState: ContentState,
//   entityKey: string,
//   children: any,
// };

const Link = ({ contentState, entityKey, children }) => {
  const { href } = contentState.getEntity(entityKey).getData();
  return (
    <a href={href} className={linkClass}>
      {children}
    </a>
  );
};

export default {
  strategy: findLinkEntities,
  component: Link,
};
