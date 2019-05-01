import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Add from './Add';
import Edit from './Edit';
import ListTable from './ListTable';

export default function PodcastRouter() {
  return (
    <Switch>
      <Route path="/podcast/page/:page" component={ListTable} />
      <Route path="/podcast/add" component={Add} />
      <Route path="/podcast/:id" component={Edit} />
      <Route path="/podcast" component={ListTable} />
    </Switch>
  );
}
