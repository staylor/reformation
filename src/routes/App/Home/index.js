import React from 'react';
import Videos from 'components/Videos';
import Latest from './Latest';
import { wrapClass, videosClass } from './styled';

/* eslint-disable react/prop-types */

export default function HomeRoute(props) {
  return (
    <div className={wrapClass}>
      <Latest />
      <div className={videosClass}>
        <Videos {...props} />
      </div>
    </div>
  );
}
