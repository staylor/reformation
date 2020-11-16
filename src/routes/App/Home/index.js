import React from 'react';
import Videos from 'components/Videos';
import Latest from './Latest';
import { wrapClass, videosClass } from './styled';

export default function HomeRoute(props) {
  return (
    <div className={wrapClass}>
      <Latest />
      <div className={videosClass}>{React.createElement(Videos, props)}</div>
    </div>
  );
}
