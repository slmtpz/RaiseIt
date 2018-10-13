import { Switch, Route } from 'react-router-dom'
import React from 'react';

import Home from './components/Home';
import Posts from './components/Posts';

const AppMain = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/posts' component={Posts}/>
    </Switch>
  </main>
)

export default AppMain;