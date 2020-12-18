import React from 'react';
import Videos from 'components/Videos';
import Latest from './Latest';
import { wrapClass, videosClass } from './styled';

export default function HomeRoute() {
  return (
    <div className={wrapClass}>
      <Latest />
      <div className={videosClass}>
        <Videos cacheKey="home-videos" />
      </div>
    </div>
  );
}
