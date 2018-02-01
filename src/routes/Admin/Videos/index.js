import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Edit from './Edit';
import ListTable from './ListTable';

export default function VideoRouter() {
  return (
    <Switch>
      <Route path="/video/page/:page" component={ListTable} />
      <Route path="/video/:id" component={Edit} />
      <Route exact path="/video" component={ListTable} />
    </Switch>
  );
}
